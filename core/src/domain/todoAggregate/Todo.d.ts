import { TodoState } from "./TodoState";
export declare class Todo {
    id: string;
    title: string;
    description: string;
    private _state;
    constructor(id: string, title: string, description: string);
    get state(): TodoState;
    set state(state: TodoState);
}
