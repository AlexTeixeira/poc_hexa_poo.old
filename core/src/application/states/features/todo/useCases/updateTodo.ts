import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo} from "../../../../../domain/todoAggregate/Todo";
import {TodoDto} from "../models/TodoDto";
import {ServiceProviderType} from "../../config/ThunkServiceProvider";
import {TodoRepository} from "../../../../../domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../../../domain/DIContainerType";
import {SpecificationErrorResult} from "../../../../../domain/core/Specification";

export const updateTodoAsync = createAsyncThunk<Todo[], TodoDto, {
    extra: ServiceProviderType
}>(
    'todos/put',
    async (todoDto: TodoDto, {extra}) => {

        const todo = new Todo(todoDto.id, todoDto.title, todoDto.description);
        const todoRepository = extra.container.get<TodoRepository>(DIContainerType.TodoRepository);

        if (await todoRepository.getByIdAsync(todo.id) == null) {
            throw new Error(JSON.stringify({
                message: "Selected todo does not exist",
                isSatisfied: false,
                errors: [{
                    message: "Selected todo does not exist",
                    key: "generic",
                }]
            } as SpecificationErrorResult));
        }

        await todoRepository.updateAsync(todo);

        return todoRepository.getAllAsync();
    }
);
