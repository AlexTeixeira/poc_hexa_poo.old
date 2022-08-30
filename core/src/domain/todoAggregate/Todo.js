"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const TodoState_1 = require("./TodoState");
const ValidTodoSpecification_1 = require("./ValidTodoSpecification");
class Todo {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this._state = TodoState_1.TodoState.New;
        new ValidTodoSpecification_1.ValidTodoSpecification(this).isSatisfiedBy();
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
}
exports.Todo = Todo;
