import { CronController, Cron } from "../../lib/index";

/**
 * Cron job controller
 *
 * @export
 * @class JobController
 */
@CronController("second")
export class SecondController {
    /**
     * Cron job that runs every five seconds.
     *
     * The cron job is named '5sec'.
     *
     * @returns {Promise<void>}
     * @memberof JobController
     */
    @Cron("5sec", "*/5 * * * * *")
    public fiveSecCronJob(): void {
        console.log("I am cron Job '5sec' and I just ran!");
    }
}
