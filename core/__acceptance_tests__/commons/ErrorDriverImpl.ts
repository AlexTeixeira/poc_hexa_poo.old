import {injectable} from "inversify";
import 'reflect-metadata';
import {ErrorDriver} from "./ErrorDriver";


@injectable()
export class ErrorDriverImpl implements ErrorDriver {
    private readonly errors: Error[]

    constructor() {
        this.errors = []
    }

    private addError(error: Error) {
        this.errors.push(error);
    }

    public getErrors(): Error[] {
        return this.errors;
    }

    public getLastError(): Error {
        return this.errors[this.errors.length - 1];
    }

    public async handleError<T>(func: () => Promise<T>){
        try {
            await func();
        } catch (error) {
            this.addError(error as Error);
        }
    }
}