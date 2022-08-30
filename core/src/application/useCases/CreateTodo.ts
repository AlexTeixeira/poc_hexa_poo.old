import {Todo} from "../../domain/todoAggregate/Todo";
import {TodoRepository} from "../../domain/todoAggregate/ports/TodoRepository";

export class CreateTodo {
    constructor(private readonly todoRepository: TodoRepository) {
    }

    async handleAsync(id: string, title: string, description: string): Promise<void> {
        const todo = new Todo(id, title, description);

        await this.todoRepository.createAsync(todo);
    }
}