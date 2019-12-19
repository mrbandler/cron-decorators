import * as moment from "moment";
import { ICronOptions } from "../../decorators/options/ICronOptions";

/**
 * Action metadata arguments.
 *
 * @export
 * @interface ICRUDMetadataArgs
 */
export interface ICronMetadataArgs {
    /**
     * Target: JS function of the handler class method.
     *
     * @type {Function}
     * @memberof ICronMetadataArgs
     */
    target: Function;

    /**
     * Method name of the target.
     *
     * @type {string}
     * @memberof ICronMetadataArgs
     */
    method: string;

    /**
     * Name of the cron.
     *
     * @type {string}
     * @memberof ICronMetadataArgs
     */
    name: string;

    /**
     * Cron time, when to execute.
     *
     * @type {(string | Date)}
     * @memberof ICronMetadataArgs
     */
    cronTime: string | Date | moment.Moment;

    /**
     * Timezone to execute in.
     *
     * @type {string}
     * @memberof ICronMetadataArgs
     */
    options?: ICronOptions;
}
