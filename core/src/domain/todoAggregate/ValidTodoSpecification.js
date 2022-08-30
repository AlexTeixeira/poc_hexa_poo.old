"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidTodoSpecification = void 0;
const Specification_1 = require("../core/Specification");
class ValidTodoSpecification extends Specification_1.Specification {
    constructor(candidate) {
        super(candidate);
    }
    criteria() {
        const result = {
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
exports.ValidTodoSpecification = ValidTodoSpecification;
