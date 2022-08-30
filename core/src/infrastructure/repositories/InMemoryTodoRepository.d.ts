import { TodoRepository } from "../../domain/todoAggregate/ports/TodoRepository";
import { Todo } from "../../domain/todoAggregate/Todo";
import 'reflect-metadata';
export declare class InMemoryTodoRepository implements TodoRepository {
    private todos;
    createAsync(todo: Todo): Promise<void>;
    getByIdAsync(id: string): Promise<Todo | undefined>;
    updateAsync(todo: Todo): Promise<void>;
    clear(): void;
    deleteAsync(todoId: string): Promise<void>;
    getAllAsync(): Promise<Todo[]>;
}
