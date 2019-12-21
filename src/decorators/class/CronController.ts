import { getMetadataArgsStorage } from "../../index";

/**
 * Job decorator.
 *
 * Typescript classes which want to use @Cron need to be decorated with this decorator.
 *
 * @export
 * @returns {ClassDecorator}
 */
export function CronController(): ClassDecorator {
    return (target: Function) => {
        getMetadataArgsStorage().addControllerMetadata({
            target: target,
        });
    };
}
