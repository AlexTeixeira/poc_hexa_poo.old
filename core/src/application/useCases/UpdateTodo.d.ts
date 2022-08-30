import { TodoRepository } from "../../domain/todoAggregate/ports/TodoRepository";
export declare class UpdateTodo {
    private todoRepository;
    constructor(todoRepository: TodoRepository);
    handleAsync(todoGuid: string, title: string, description: string): Promise<void>;
}
