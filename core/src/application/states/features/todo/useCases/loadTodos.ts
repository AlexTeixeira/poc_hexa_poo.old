import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo} from "../../../../../domain/todoAggregate/Todo";
import {ServiceProviderType} from "../../config/ThunkServiceProvider";
import {TodoRepository} from "../../../../../domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../../../domain/DIContainerType";

export const loadTodosAsync = createAsyncThunk<Todo[], undefined,{
    extra: ServiceProviderType
}>(
    'todos/get',
    async (_arg,{extra}) => {
       const todoRepository = extra.container.get<TodoRepository>(DIContainerType.TodoRepository);

       return await todoRepository.getAllAsync();
    }
);