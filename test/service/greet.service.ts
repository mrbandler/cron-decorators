import { Service } from "typedi";

@Service()
export class GreetService {
    public greet(name: string): string {
        return "Hello, " + name;
    }
}
