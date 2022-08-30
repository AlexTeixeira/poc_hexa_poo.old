"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specification = void 0;
class Specification {
    constructor(candidate) {
        this.candidate = candidate;
    }
    isSatisfiedBy() {
        const result = this.criteria();
        if (!result.isSatisfied) {
            throw new Error(JSON.stringify(result));
        }
    }
}
exports.Specification = Specification;
