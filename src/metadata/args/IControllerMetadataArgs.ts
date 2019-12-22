/**
 * Controller metadata arguments.
 *
 * @export
 * @interface IJobMetadataArgs
 */
export interface IControllerMetadataArgs {
    /**
     * Target: JS function for the handler class.
     *
     * @type {Function}
     * @memberof IControllerMetadataArgs
     */
    target: Function;

    /**
     * Namespace the cron jobs will be registered unter.
     *
     * @type {string}
     * @memberof IControllerMetadataArgs
     */
    namespace?: string;
}
