import {Todo} from "../../domain/todoAggregate/Todo";
import {TodoRepository} from "../../domain/todoAggregate/ports/TodoRepository";

export class UpdateTodo {
  constructor(private todoRepository: TodoRepository) {}

  public async handleAsync(todoGuid: string, title: string, description: string): Promise<void> {
    const todo = new Todo(todoGuid, title, description);

    if(await this.todoRepository.getByIdAsync(todoGuid) == null) {
      throw new Error("Selected todo does not exist");
    }

    await this.todoRepository.updateAsync(todo);
  }
}