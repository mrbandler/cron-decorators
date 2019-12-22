import { IControllerMetadataArgs } from "../metadata/args/IControllerMetadataArgs";
import { ICronMetadataArgs } from "../metadata/args/ICronMetadataArgs";

/**
 * Metadata arguments storage.
 *
 * @export
 * @class MetadataArgsStorage
 */
export class MetadataArgsStorage {
    /**
     * Controller metadata arguments.
     *
     * @private
     * @type {IControllerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private controller: IControllerMetadataArgs[] = [];

    /**
     * Cron metadata arguments.
     *
     * @private
     * @type {ICronMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private crons: ICronMetadataArgs[] = [];

    /**
     * Controller metadata.
     *
     * @readonly
     * @type {IControllerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    get controllerMetadata(): IControllerMetadataArgs[] {
        return this.controller;
    }

    /**
     * Adds contropller metadata.
     *
     * @param {IControllerMetadataArgs} metadata Metadata arguments
     * @memberof MetadataArgsStorage
     */
    public addControllerMetadata(metadata: IControllerMetadataArgs): void {
        this.controller.push(metadata);
    }

    /**
     * Adds cron metadata.
     *
     * @param {ICronMetadataArgs} metadata Metadata arguments
     * @memberof MetadataArgsStorage
     */
    public addCronMetadata(metadata: ICronMetadataArgs): void {
        if (this.crons.filter(c => c.name === metadata.name).length <= 0) {
            this.crons.push(metadata);
        } else {
            console.warn(`Cron '${metadata.name}' could not be mounted, a cron job with the same name already exists.`);
        }
    }

    /**
     * Filters controller metadata for given classes.
     *
     * @param {Function[]} classes Controller classes
     * @returns {IControllerMetadataArgs[]} Filtered controller metadata
     * @memberof MetadataArgsStorage
     */
    public filterControllerMetadataForClasses(classes: Function[]): IControllerMetadataArgs[] {
        return this.controller.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }

    /**
     * Filters cron metadata for given target.
     *
     * @param {Function} target Target of the cron
     * @returns {ICronMetadataArgs[]} Filtered cron metadata
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
        this.controller = [];
        this.crons = [];
    }
}
