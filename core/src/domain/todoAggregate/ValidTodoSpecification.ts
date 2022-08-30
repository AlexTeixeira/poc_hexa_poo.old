import {Specification, SpecificationErrorResult} from "../core/Specification";
import {Todo} from "./Todo";

export class ValidTodoSpecification extends Specification<Todo> {

    constructor(candidate: Todo) {
        super(candidate);
    }

    criteria(): SpecificationErrorResult {
        const result: SpecificationErrorResult = {
            errors: [],
            isSatisfied: true,
            message: '',
        };

        this.candidate.title = this.candidate.title.trim();
        if (this.candidate.title.length === 0) {
            result.errors.push({
                message: "Title is required",
                key: "title"
            });
        }

        if (this.candidate.description.length === 0) {
            result.errors.push({
                message: "Description is required",
                key: "description"
            });
        }

        result.isSatisfied = result.errors.length === 0;
        result.message = !result.isSatisfied ? "Todo content should be valid" : "";
        return result;
    }

}