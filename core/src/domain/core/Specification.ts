export abstract class Specification<T>
{
    protected constructor(protected candidate: T) {

    }

    public isSatisfiedBy() {
        const result = this.criteria();
        if(!result.isSatisfied){
            throw new Error(JSON.stringify(result));
        }
    }

    public abstract criteria(): SpecificationErrorResult;
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