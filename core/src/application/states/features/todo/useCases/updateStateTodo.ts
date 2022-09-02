import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo} from "../../../../../domain/todoAggregate/Todo";
import {ServiceProviderType} from "../../config/ThunkServiceProvider";
import {TodoRepository} from "../../../../../domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../../../domain/DIContainerType";
import {SpecificationErrorResult} from "../../../../../domain/core/Specification";
import {TodoStatus} from "../../../../../domain/todoAggregate/TodoStatus";

export const updateTodoStateAsync = createAsyncThunk<Todo[], { id: string, state: TodoStatus }, {
    extra: ServiceProviderType
}>(
    'todos/put/state',
    async ({id, state}, {extra}) => {

        const todoRepository = extra.container.get<TodoRepository>(DIContainerType.TodoRepository);
        const todo = await todoRepository.getByIdAsync(id);
        if (todo == null) {
            throw new Error(JSON.stringify({
                message: "Selected todo does not exist",
                isSatisfied: false,
                errors: [{
                    message: "Selected todo does not exist",
                    key: "generic",
                }]
            } as SpecificationErrorResult));
        }

        todo.state = state;

        await todoRepository.updateAsync(todo);

        return todoRepository.getAllAsync();
    }
);
