import { Specification, SpecificationErrorResult } from "../core/Specification";
import { Todo } from "./Todo";
export declare class ValidTodoSpecification extends Specification<Todo> {
    constructor(candidate: Todo);
    criteria(): SpecificationErrorResult;
}
