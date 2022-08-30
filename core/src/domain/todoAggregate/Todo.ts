import {TodoState} from "./TodoState";
import {ValidTodoSpecification} from "./ValidTodoSpecification";

export class Todo {
    private _state: TodoState;

    constructor(
        public id: string,
        public title: string,
        public description: string,
    ) {
        this._state = TodoState.New

        new ValidTodoSpecification(this).isSatisfiedBy();
    }

    public get state(): TodoState {
        return this._state;
    }

    public set state(state: TodoState) {
        this._state = state;
    }
}
