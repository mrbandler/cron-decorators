import { Service } from "typedi";

/**
 * Greeter service.
 *
 * @export
 * @class GreetService
 */
@Service()
export class GreetService {
    /**
     * Will greet a given name.
     *
     * @param {string} name Name to greet
     * @returns {string}
     * @memberof GreetService
     */
    public greet(name: string): string {
        return "Hello, " + name;
    }
}
