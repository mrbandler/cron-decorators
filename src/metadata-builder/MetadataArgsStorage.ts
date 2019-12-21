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
     * Handler metadata arguments.
     *
     * @private
     * @type {IHandlerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private controller: IControllerMetadataArgs[] = [];

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
    get controllerMetadata(): IControllerMetadataArgs[] {
        return this.controller;
    }

    /**
     * Adds handler metadata.
     *
     * @param {IHandlerMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addControllerMetadata(metadata: IControllerMetadataArgs): void {
        this.controller.push(metadata);
    }

    /**
     * Adds action metadata.
     *
     * @param {IActionMetadataArgs} metadata Metadata arguments.
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
     * Filters handler metadata for given classes.
     *
     * @param {Function[]} classes Handler classes.
     * @returns {IHandlerMetadataArgs[]} Filtered handler metadata.
     * @memberof MetadataArgsStorage
     */
    public filterControllerMetadataForClasses(classes: Function[]): IControllerMetadataArgs[] {
        return this.controller.filter(ctrl => {
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
        this.controller = [];
        this.crons = [];
    }
}
