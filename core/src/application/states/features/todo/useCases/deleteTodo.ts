import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo} from "../../../../../domain/todoAggregate/Todo";
import {ServiceProviderType} from "../../config/ThunkServiceProvider";
import {TodoRepository} from "../../../../../domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../../../domain/DIContainerType";
import {SpecificationErrorResult} from "../../../../../domain/core/Specification";

export const deleteTodoAsync = createAsyncThunk<Todo[], string, {
    extra: ServiceProviderType
}>(
    'todos/delete',
    async (id: string, {extra}) => {

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

        await todoRepository.deleteAsync(id);

        return todoRepository.getAllAsync();
    }
);