import { getFromContainer } from "../container";
import { IControllerMetadataArgs } from "./args/IControllerMetadataArgs";
import { CronMetadata } from "./CronMetadata";

/**
 * Handler metadata.
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
     * Cron metadata.
     *
     * @type {CronMetadata[]}
     * @memberof JobMetadata
     */
    crons: CronMetadata[] = [];

    /**
     * Default constructor.
     * @param {IControllerMetadataArgs} args Metadata arguments.
     * @memberof JobMetadata
     */
    constructor(args: IControllerMetadataArgs) {
        this.target = args.target;
    }

    /**
     * Returns a instance of the handler.
     *
     * @readonly
     * @type {*}
     * @memberof JobMetadata
     */
    get instance(): any {
        return getFromContainer(this.target);
    }
}
