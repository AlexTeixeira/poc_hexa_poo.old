import {TodoStatus} from "./TodoStatus";
import {ValidTodoSpecification} from "./ValidTodoSpecification";

export class Todo {
    private _state: TodoStatus;

    constructor(
        public id: string,
        public title: string,
        public description: string,
    ) {
        this._state = TodoStatus.New

        new ValidTodoSpecification(this).isSatisfiedBy();
    }

    public get state(): TodoStatus {
        return this._state;
    }

    public set state(state: TodoStatus) {
        this._state = state;
    }
}
