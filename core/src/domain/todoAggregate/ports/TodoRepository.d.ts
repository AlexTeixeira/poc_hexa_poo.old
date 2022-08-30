import { Todo } from "../Todo";
export interface TodoRepository {
    createAsync(todo: Todo): Promise<void>;
    getByIdAsync(id: string): Promise<Todo | undefined>;
    updateAsync(todo: Todo): Promise<void>;
    clear(): void;
    deleteAsync(todoId: string): Promise<void>;
    getAllAsync(): Promise<Todo[]>;
}
