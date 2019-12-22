import { getFromContainer } from "../container";
import { IControllerMetadataArgs } from "./args/IControllerMetadataArgs";
import { CronMetadata } from "./CronMetadata";

/**
 * Controller metadata.
 *
 * @export
 * @class JobMetadata
 */
export class ControllerMetadata {
    /**
     * Target: Typescript class.
     *
     * @type {Function}
     * @memberof JobMetadata
     */
    target: Function;

    /**
     * Controller namespace.
     *
     * @type {string}
     * @memberof ControllerMetadata
     */
    namespace?: string;

    /**
     * Cron metadata.
     *
     * @type {CronMetadata[]}
     * @memberof ControllerMetadata
     */
    crons: CronMetadata[] = [];

    /**
     * Default constructor.
     * @param {IControllerMetadataArgs} args Metadata arguments.
     * @memberof ControllerMetadata
     */
    constructor(args: IControllerMetadataArgs) {
        this.target = args.target;
        this.namespace = args.namespace;
    }

    /**
     * Returns a instance of the controller.
     *
     * @readonly
     * @type {*}
     * @memberof ControllerMetadata
     */
    get instance(): any {
        return getFromContainer(this.target);
    }
}
