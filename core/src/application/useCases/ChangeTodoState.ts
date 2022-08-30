import {TodoRepository} from "../../domain/todoAggregate/ports/TodoRepository";
import {TodoState} from "../../domain/todoAggregate/TodoState";
import {Todo} from "../../domain/todoAggregate/Todo";

export class ChangeTodoState {

    constructor(private todoRepository: TodoRepository) {
    }

    public async handleAsync(id: string, state: TodoState) {
        const todo = await this.todoRepository.getByIdAsync(id);
        if(todo == null) {
            throw new Error("Selected todo does not exist");
        }

        todo.state = state;

        await this.todoRepository.updateAsync(todo);
    }
}