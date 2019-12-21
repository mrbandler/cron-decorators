import { getMetadataArgsStorage } from "../index";
import { ControllerMetadata } from "../metadata/ControllerMetadata";
import { CronMetadata } from "../metadata/CronMetadata";

/**
 * Metadata builder.
 *
 * @export
 * @class MetadataBuilder
 */
export class MetadataBuilder {
    /**
     * Builds handler metadata for a given set of handler classes.
     *
     * @param {Function[]} [classes] Handler classes.
     * @returns {Job[]} Build handler metadata.
     * @memberof MetadataBuilder
     */
    public buildControllerMetadata(classes?: Function[]): ControllerMetadata[] {
        return this.createController(classes);
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for.
     * @returns {Job[]} Created handler metadata.
     * @memberof MetadataBuilder
     */
    private createController(classes?: Function[]): ControllerMetadata[] {
        const controllers = !classes ? getMetadataArgsStorage().controllerMetadata : getMetadataArgsStorage().filterControllerMetadataForClasses(classes);

        return controllers.map(controllerArgs => {
            const controller = new ControllerMetadata(controllerArgs);
            controller.crons = this.createCrons(controller);

            return controller;
        });
    }

    /**
     * Creates action metadata.
     *
     * @param {Job} job Handler metadata.
     * @returns {CronMetadata[]} Created action metadata.
     * @memberof MetadataBuilder
     */
    private createCrons(job: ControllerMetadata): CronMetadata[] {
        return getMetadataArgsStorage()
            .filterCronsWithTarget(job.target)
            .map(cronArgs => new CronMetadata(job, cronArgs));
    }
}
