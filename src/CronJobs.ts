import * as cron from "cron";
import { MetadataBuilder } from "./metadata-builder/MetadataBuilder";
import { CronMetadata } from "./metadata/CronMetadata";

export interface ICronJob {
    job: cron.CronJob;
    cronMetadata: CronMetadata;
}

/**
 * CDS Handler.
 *
 * @export
 * @class CDSHandler
 */
export class CronJobs {
    private static cronJobs: ICronJob[] = [];

    /**
     * Registers all handlers on the given service.
     *
     * @static
     * @param {*} srv Service to register the handlers on.
     * @param {Function[]} classes Handler classes.
     * @memberof CronJobs
     */
    public static registerJobs(classes: Function[]): void {
        const jobs = new MetadataBuilder().buildJobsMetadata(classes);
        jobs.forEach(job => {
            job.crons.forEach(c => {
                const cronParams: cron.CronJobParameters = {
                    cronTime: c.cronTime,
                    onTick: () => c.exec(),
                    context: c.getContext(),
                    start: true,
                    timeZone: c.options !== undefined ? c.options.timeZone : undefined,
                    runOnInit: c.options !== undefined ? c.options.runOnInit : undefined,
                };

                this.cronJobs.push({
                    job: new cron.CronJob(cronParams),
                    cronMetadata: c,
                });
            });
        });
    }

    public static startCron(name: string): void {
        const crons = this.cronJobs.filter(c => c.cronMetadata.name === name);
        crons.forEach(c => c.job.start());
    }

    public static stopCron(name: string): void {
        const crons = this.cronJobs.filter(c => c.cronMetadata.name === name);
        crons.forEach(c => c.job.stop());
    }

    public static execCron(name: string): void {
        const crons = this.cronJobs.filter(c => c.cronMetadata.name === name);
        crons.forEach(c => c.cronMetadata.exec());
    }
}
