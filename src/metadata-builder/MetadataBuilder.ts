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
     * Builds controller metadata for a given set of controller classes.
     *
     * @param {Function[]} [classes] Controller classes.
     * @returns {ControllerMetadata[]} Build controller metadata.
     * @memberof MetadataBuilder
     */
    public buildControllerMetadata(classes?: Function[]): ControllerMetadata[] {
        return this.createController(classes);
    }

    /**
     * Create controller metadata.
     *
     * @param {Function[]} [classes] Controller classes to build for.
     * @returns {ControllerMetadata[]} Created controller metadata.
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
     * Creates cron metadata.
     *
     * @param {ControllerMetadata} controller Controller metadata.
     * @returns {CronMetadata[]} Created cron metadata.
     * @memberof MetadataBuilder
     */
    private createCrons(controller: ControllerMetadata): CronMetadata[] {
        return getMetadataArgsStorage()
            .filterCronsWithTarget(controller.target)
            .map(cronArgs => new CronMetadata(controller, cronArgs));
    }
}
