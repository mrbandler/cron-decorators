import * as path from "path";
import * as cron from "cron";
import { CronManager } from "./CronManager";
import { MetadataArgsStorage } from "./metadata-builder/MetadataArgsStorage";

export * from "./container";
export * from "./decorators/class/CronController";
export * from "./decorators/method/Cron";

/**
 * Imports decorated classes from directories.
 *
 * @export
 * @param {string[]} directories Directories to search in.
 * @param {string} [formats=[".js", ".ts"]] Formats to import classes from.
 * @returns {Function[]} Imported classes.
 */
function importClassesFromDirectories(directories: string[], formats = [".js", ".ts"]): Function[] {
    const loadFileClasses = function(exported: any, allLoaded: Function[]) {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        } else if (exported instanceof Array) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));
        } else if (exported instanceof Object || typeof exported === "object") {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
        }

        return allLoaded;
    };

    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(require("glob").sync(path.normalize(dir)));
    }, [] as string[]);

    const dirs = allFiles
        .filter(file => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== ".d.ts";
        })
        .map(file => {
            return require(file);
        });

    return loadFileClasses(dirs, []);
}

/**
 * Create combined handler.
 *
 * @export
 * @param {(Function[] | string[])} jobs Handlers; either classes directly or the directories where the handlers reside.
 * @returns {(srv: any) => void} Function that is used to register all endpoints.
 */
export function registerController(jobs: Function[] | string[]): void {
    let jobClasses: Function[];
    if (jobs && jobs.length) {
        jobClasses = (jobs as any[]).filter(controller => controller instanceof Function);
        const handlerDirs = (jobs as any[]).filter(controller => typeof controller === "string");
        jobClasses.push(...importClassesFromDirectories(handlerDirs));

        CronManager.registerController(jobClasses);
    }
}

/**
 * Starts a stopped cron.
 *
 * @static
 * @param {string} name Name of the cron to start
 * @returns {boolean} Flag, wheter or not the cron could be started
 */
export function startCron(name: string): boolean {
    return CronManager.startCron(name);
}

/**
 * Stops a running cron job.
 *
 * @static
 * @param {string} name Name of the cron job to stop
 * @returns {boolean} Flag, wheter or not the cron could be stopped
 */
export function stopCron(name: string): boolean {
    return CronManager.stopCron(name);
}

/**
 * Executes a cron job manually.
 *
 * @static
 * @param {string} name Name of the cron job to execute
 * @returns {boolean} Flag, wheter or not the cron could be executed
 */
export function execCron(name: string): boolean {
    return CronManager.execCron(name);
}

/**
 * Returns a mounted cron job.
 *
 * @static
 * @param {string} name Name of the cron job to return
 * @returns {(cron.CronJob | undefined)} Found cron job or undefined if the cron could not be found
 */
export function getCron(name: string): cron.CronJob | undefined {
    return CronManager.getCron(name);
}

/**
 * Returns all mounted cron jobs.
 *
 * @static
 * @param {string} [namespace] Namespace to filter the cron jobs
 * @returns {Map<string, cron.CronJob>} Found cronjobs
 */
export function getCrons(namespace?: string): Map<string, cron.CronJob> {
    return CronManager.getCrons(namespace);
}

/**
 * Returns the metadata arguments storage.
 *
 * @export
 * @returns {MetadataArgsStorage} Metadata arguments storage.
 */
export function getCronMetadataArgsStorage(): MetadataArgsStorage {
    if (!(global as any).cdsHandlersMetadataArgsStorage) (global as any).cdsHandlersMetadataArgsStorage = new MetadataArgsStorage();

    return (global as any).cdsHandlersMetadataArgsStorage;
}
