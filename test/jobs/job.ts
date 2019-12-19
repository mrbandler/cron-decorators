import { Job } from "../../lib/index";
import { Cron } from "../../lib/index";
import { Inject } from "typedi";
import { GreetService } from "../service/greet.service";

@Job()
export class JobController {
    @Inject()
    private greetService!: GreetService;

    @Cron("sec", "* * * * * *")
    public async asyncCronJob(): Promise<void> {
        console.log(this.greetService.greet("Test"));
    }

    @Cron("30sec", "30 * * * * *")
    public cronJob(): void {
        console.log("Test: Running every 30 seconds!");
    }
}
