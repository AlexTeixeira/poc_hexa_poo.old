export declare abstract class Specification<T> {
    protected candidate: T;
    protected constructor(candidate: T);
    isSatisfiedBy(): void;
    abstract criteria(): SpecificationErrorResult;
}
export interface SpecificationErrorResult {
    errors: SpecificationError[];
    isSatisfied: boolean;
    message: string;
}
export interface SpecificationError {
    message: string;
    key: string;
}
