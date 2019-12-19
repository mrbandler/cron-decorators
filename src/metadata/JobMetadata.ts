import { getFromContainer } from "../container";
import { IJobMetadataArgs } from "./args/IJobMetadataArgs";
import { CronMetadata } from "./CronMetadata";

/**
 * Handler metadata.
 *
 * @export
 * @class JobMetadata
 */
export class JobMetadata {
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
     * @param {IJobMetadataArgs} args Metadata arguments.
     * @memberof JobMetadata
     */
    constructor(args: IJobMetadataArgs) {
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
