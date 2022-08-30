import { TodoRepository } from "../../domain/todoAggregate/ports/TodoRepository";
import { TodoState } from "../../domain/todoAggregate/TodoState";
export declare class ChangeTodoState {
    private todoRepository;
    constructor(todoRepository: TodoRepository);
    handleAsync(id: string, state: TodoState): Promise<void>;
}
