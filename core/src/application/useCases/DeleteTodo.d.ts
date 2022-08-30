import { TodoRepository } from "../../domain/todoAggregate/ports/TodoRepository";
export declare class DeleteTodo {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    handleAsync(id: string): Promise<void>;
}
