import { getMetadataArgsStorage } from "../../index";

/**
 * Job decorator.
 *
 * Typescript classes which want to use @Cron need to be decorated with this decorator.
 *
 * @export
 * @returns {ClassDecorator}
 */
export function Job(): ClassDecorator {
    return (target: Function) => {
        getMetadataArgsStorage().addJobMetadata({
            target: target,
        });
    };
}
