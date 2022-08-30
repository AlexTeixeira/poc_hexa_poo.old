import {TodoRepository} from "../../domain/todoAggregate/ports/TodoRepository";

export class DeleteTodo {
    constructor(private readonly todoRepository: TodoRepository) {
    }

    async handleAsync(id: string): Promise<void> {
        const todo = await this.todoRepository.getByIdAsync(id);
        if (todo == null) {
            throw new Error("Selected todo does not exist");
        }

        await this.todoRepository.deleteAsync(id);
    }
}