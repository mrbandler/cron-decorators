import * as moment from "moment";
import { getCronMetadataArgsStorage } from "../../index";
import { ICronOptions } from "../options/ICronOptions";

/**
 * Registers a cron job.
 *
 * @export
 * @param {string} name Name of the cron job
 * @param {(string | Date)} cronTime Time or pattern when to run the cron job
 * @param {ICronOptions} [options={
 *         runOnInit: false,
 *         timeZone: "",
 *     }] Additional options
 * @returns
 */
export function Cron(
    name: string,
    cronTime: string | Date | moment.Moment,
    options: ICronOptions = {
        runOnInit: false,
        timeZone: "",
    }
) {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getCronMetadataArgsStorage().addCronMetadata({
            target: target.constructor,
            name: name,
            method: key as string,
            cronTime: cronTime,
            options: options,
        });
    };
}
