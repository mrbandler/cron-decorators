import { CronController, Cron } from "../../lib/index";
import moment from "moment";

/**
 * Cron job controller
 *
 * @export
 * @class JobController
 */
@CronController("first")
export class FirstController {
    /**
     * Async cron job that runs every second.
     *
     * The cron job is named 'sec'.
     *
     * @returns {Promise<void>}
     * @memberof JobController
     */
    @Cron("sec", "* * * * * *")
    public async secCronJob(): Promise<void> {
        console.log("I am cron Job 'sec' and I just ran!");
    }

    /**
     * Cron job that runs every 10 seconds.
     *
     * The cron job is named "10sec".
     *
     * @memberof JobController
     */
    @Cron("10sec", "*/10 * * * * *")
    public tenSecCronJob(): void {
        console.log("I am cron Job '10sec' and I just ran!");
    }

    /**
     * Cron job that runs at the 22nd December 2019 at 15:42:00.
     *
     * The cron job is named "date".
     *
     * @memberof JobController
     */
    @Cron("date", new Date("December 22, 2019 15:42:00"))
    public dateCronJob(): void {
        console.log("I am cron Job 'date' and I just ran!");
    }

    /**
     * Cron job that runs at the 22nd December 2019 at 15:42:00.
     *
     * The cron job is named "moment".
     *
     * @memberof JobController
     */
    @Cron("moment", moment("2019-12-22 15:42:00"), {
        runOnInit: false,
        timeZone: "Europe/Berlin",
    })
    public momentCronJob(): void {
        console.log("I am cron Job 'moment' and I just ran!");
    }
}
