import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodoDto} from "../models/TodoDto";
import {ServiceProviderType} from "../../config/ThunkServiceProvider";
import {TodoRepository} from "../../../../../domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../../../domain/DIContainerType";
import {Todo} from "../../../../../domain/todoAggregate/Todo";

export const createTodoAsync = createAsyncThunk<Todo[], TodoDto, {
    extra: ServiceProviderType
}>(
    'todos/post',
    async (todoDto: TodoDto, {extra}) => {

        const todoRepository = extra.container.get<TodoRepository>(DIContainerType.TodoRepository);
        const todo = new Todo(todoDto.id, todoDto.title, todoDto.description);

        await todoRepository.createAsync(todo);
        return todoRepository.getAllAsync();
    }
);

