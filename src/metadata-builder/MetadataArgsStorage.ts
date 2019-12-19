import { IJobMetadataArgs } from "../metadata/args/IJobMetadataArgs";
import { ICronMetadataArgs } from "../metadata/args/ICronMetadataArgs";

/**
 * Metadata arguments storage.
 *
 * @export
 * @class MetadataArgsStorage
 */
export class MetadataArgsStorage {
    /**
     * Handler metadata arguments.
     *
     * @private
     * @type {IHandlerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private jobs: IJobMetadataArgs[] = [];

    /**
     * Action metadata arguments.
     *
     * @private
     * @type {IActionMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private crons: ICronMetadataArgs[] = [];

    /**
     * Jobs metadata.
     *
     * @readonly
     * @type {IHandlerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    get jobsMetadata(): IJobMetadataArgs[] {
        return this.jobs;
    }

    /**
     * Adds handler metadata.
     *
     * @param {IHandlerMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addJobMetadata(metadata: IJobMetadataArgs): void {
        this.jobs.push(metadata);
    }

    /**
     * Adds action metadata.
     *
     * @param {IActionMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addCronMetadata(metadata: ICronMetadataArgs): void {
        this.crons.push(metadata);
    }

    /**
     * Filters handler metadata for given classes.
     *
     * @param {Function[]} classes Handler classes.
     * @returns {IHandlerMetadataArgs[]} Filtered handler metadata.
     * @memberof MetadataArgsStorage
     */
    public filterJobsMetadataForClasses(classes: Function[]): IJobMetadataArgs[] {
        return this.jobs.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }

    /**
     * Filters action metadata for given target.
     *
     * @param {Function} target Target of the action.
     * @returns {IActionMetadataArgs[]} Filtered action metadata.
     * @memberof MetadataArgsStorage
     */
    public filterCronsWithTarget(target: Function): ICronMetadataArgs[] {
        return this.crons.filter(cron => cron.target === target);
    }

    /**
     * Resets the storage.
     *
     * @memberof MetadataArgsStorage
     */
    public reset(): void {
        this.jobs = [];
        this.crons = [];
    }
}
