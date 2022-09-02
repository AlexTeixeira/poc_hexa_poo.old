import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {SpecificationErrorResult} from "../../../../domain/core/Specification";
import {createTodoAsync} from "./useCases/createTodo";
import {Todo} from "../../../../domain/todoAggregate/Todo";
import {updateTodoAsync} from "./useCases/updateTodo";
import {deleteTodoAsync} from "./useCases/deleteTodo";
import {updateTodoStateAsync} from "./useCases/updateStateTodo";
import {loadTodosAsync} from "./useCases/loadTodos";
import {TodoStatus} from "../../../../domain/todoAggregate/TodoStatus";

export interface TodosState {
    items: Todo[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: SpecificationErrorResult | undefined
}

const initialState: TodosState = {
    items: [],
    status: 'idle',
    error: undefined
};

export const todosSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(createTodoAsync.pending, updateTodoAsync.pending, deleteTodoAsync.pending, updateTodoStateAsync.pending,
                    loadTodosAsync.pending),
                (state) => {
                    state.status = 'loading';
                })
            .addMatcher(isAnyOf(createTodoAsync.fulfilled, updateTodoAsync.fulfilled, deleteTodoAsync.fulfilled, updateTodoStateAsync.fulfilled,
                    loadTodosAsync.fulfilled),
                (state, action) => {
                    state.status = 'success';
                    state.items = action.payload;
                })
            .addMatcher(isAnyOf(createTodoAsync.rejected, updateTodoAsync.rejected, deleteTodoAsync.rejected, updateTodoStateAsync.rejected,
                    loadTodosAsync.rejected),
                (state, action) => {
                    state.status = 'failed';
                    if (action.error.message) {
                        state.error = JSON.parse(action.error.message);
                    }
                });
    },
});

export const selectTodos = (state: RootState) => state.todos.items;
export const selectTodosByState = (state: RootState, todoState: TodoStatus) => state.todos.items.filter((todo) => todo.state === todoState);
export const selectTodoById = (todos: Todo[], id: string) => todos.find(todo => todo.id === id);
export const selectErrorByKey = (state: RootState, key: string) => state.todos.error?.errors.find(error => error.key === key)?.message;

export default todosSlice.reducer;
