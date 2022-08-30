import { TodoRepository } from "../../domain/todoAggregate/ports/TodoRepository";
export declare class CreateTodo {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    handleAsync(id: string, title: string, description: string): Promise<void>;
}
