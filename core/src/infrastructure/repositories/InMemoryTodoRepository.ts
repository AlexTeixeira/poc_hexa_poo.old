import {TodoRepository} from "../../domain/todoAggregate/ports/TodoRepository";
import {Todo} from "../../domain/todoAggregate/Todo";
import {injectable} from "inversify";
import 'reflect-metadata';

@injectable()
export class InMemoryTodoRepository implements TodoRepository {
    private todos: Todo[] = [];

    async createAsync(todo: Todo): Promise<void> {
        this.todos.push(todo);
    }

    async getByIdAsync(id: string): Promise<Todo | undefined> {
        const todo = this.todos.find(curr => curr.id === id);
        return Promise.resolve(todo ? Object.create(todo) : undefined);
    }

    updateAsync(todo: Todo): Promise<void> {
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos[index] = todo;
        return Promise.resolve();
    }

    clear(): void {
        this.todos = [];
    }

    deleteAsync(todoId: string): Promise<void> {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        return Promise.resolve();
    }

    getAllAsync(): Promise<Todo[]> {
        return Promise.resolve([...this.todos]);
    }
}

