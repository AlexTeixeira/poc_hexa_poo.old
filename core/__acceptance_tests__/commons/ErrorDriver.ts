export interface ErrorDriver {
    getLastError(): Error;
    getErrors(): Error[];
    handleError<T>(func: () => Promise<T>): Promise<void>;
}