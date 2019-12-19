import { getMetadataArgsStorage } from "../index";
import { JobMetadata } from "../metadata/JobMetadata";
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
    public buildJobsMetadata(classes?: Function[]): JobMetadata[] {
        return this.createJobs(classes);
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for.
     * @returns {Job[]} Created handler metadata.
     * @memberof MetadataBuilder
     */
    private createJobs(classes?: Function[]): JobMetadata[] {
        const jobs = !classes ? getMetadataArgsStorage().jobsMetadata : getMetadataArgsStorage().filterJobsMetadataForClasses(classes);

        return jobs.map(jobArgs => {
            const job = new JobMetadata(jobArgs);
            job.crons = this.createCrons(job);

            return job;
        });
    }

    /**
     * Creates action metadata.
     *
     * @param {Job} job Handler metadata.
     * @returns {CronMetadata[]} Created action metadata.
     * @memberof MetadataBuilder
     */
    private createCrons(job: JobMetadata): CronMetadata[] {
        return getMetadataArgsStorage()
            .filterCronsWithTarget(job.target)
            .map(cronArgs => new CronMetadata(job, cronArgs));
    }
}
