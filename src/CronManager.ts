import * as cron from "cron";
import { MetadataBuilder } from "./metadata-builder/MetadataBuilder";
import { CronMetadata } from "./metadata/CronMetadata";

/**
 * Mounted cron job.
 *
 * @export
 * @interface ICronJob
 */
export interface ICronJob {
    job: cron.CronJob;
    cronMetadata: CronMetadata;
}

/**
 * Manages all mounted crons.
 *
 * @export
 * @class CronManager
 */
export class CronManager {
    /**
     * All mounted crons.
     *
     * @private
     * @static
     * @type {ICronJob[]}
     * @memberof CronManager
     */
    private static cronJobs: ICronJob[] = [];

    /**
     * Registers all controllers and their crons.
     *
     * @static
     * @param {Function[]} classes Controller classes
     * @memberof CronManager
     */
    public static registerController(classes: Function[]): void {
        const jobs = new MetadataBuilder().buildControllerMetadata(classes);
        jobs.forEach(job => {
            job.crons.forEach(c => {
                try {
                    const cronParams: cron.CronJobParameters = {
                        cronTime: c.cronTime,
                        onTick: () => c.exec(),
                        context: c.getContext(),
                        timeZone: c.options.timeZone,
                        runOnInit: c.options.runOnInit,
                    };

                    const cronJob = new cron.CronJob(cronParams);
                    this.cronJobs.push({
                        job: cronJob,
                        cronMetadata: c,
                    });
                } catch (error) {
                    console.warn(`Could not mount cron '${c.name}':`, error.message);
                }
            });
        });

        this.cronJobs.forEach(cj => {
            try {
                cj.job.start();
            } catch (error) {
                console.warn(`Could not start cron '${cj.cronMetadata.name}':`, error.message);
            }
        });
    }

    /**
     * Starts a stopped cron.
     *
     * @static
     * @param {string} name Name of the cron to start
     * @returns {boolean} Flag, wheter or not the cron could be started
     * @memberof CronManager
     */
    public static startCron(name: string): boolean {
        let result = false;

        const cron = this.cronJobs.find(c => c.cronMetadata.name === name);
        if (cron) {
            try {
                cron.job.start();
                result = true;
            } catch {}
        }

        return result;
    }

    /**
     * Stops a running cron job.
     *
     * @static
     * @param {string} name Name of the cron job to stop
     * @returns {boolean} Flag, wheter or not the cron could be stopped
     * @memberof CronManager
     */
    public static stopCron(name: string): boolean {
        let result = false;

        const cron = this.cronJobs.find(c => c.cronMetadata.name === name);
        if (cron) {
            try {
                cron.job.stop();
                result = true;
            } catch {}
        }

        return result;
    }

    /**
     * Executes a cron job manually.
     *
     * @static
     * @param {string} name Name of the cron job to execute
     * @returns {boolean} Flag, wheter or not the cron could be executed
     * @memberof CronManager
     */
    public static execCron(name: string): boolean {
        let result = false;

        const cron = this.cronJobs.find(c => c.cronMetadata.name === name);
        if (cron) {
            try {
                cron.job.fireOnTick();
                result = true;
            } catch {}
        }

        return result;
    }

    /**
     * Returns a mounted cron job.
     *
     * @static
     * @param {string} name Name of the cron job to return
     * @returns {(cron.CronJob | undefined)} Found cron job or undefined if the cron could not be found
     * @memberof CronManager
     */
    public static getCron(name: string): cron.CronJob | undefined {
        let result: cron.CronJob | undefined = undefined;

        const cron = this.cronJobs.find(c => c.cronMetadata.name === name);
        if (cron) {
            result = cron.job;
        }

        return result;
    }

    /**
     * Returns all mounted cron jobs.
     *
     * @static
     * @param {string} [namespace] Namespace to filter the cron jobs
     * @returns {Map<string, cron.CronJob>} Found cronjobs
     * @memberof CronManager
     */
    public static getCrons(namespace?: string): Map<string, cron.CronJob> {
        let result = new Map<string, cron.CronJob>();

        if (namespace) {
            this.cronJobs.forEach(c => {
                if (c.cronMetadata.jobMetadata.namespace === namespace) {
                    result.set(c.cronMetadata.name, c.job);
                }
            });
        } else {
            this.cronJobs.forEach(c => result.set(c.cronMetadata.name, c.job));
        }

        return result;
    }
}
