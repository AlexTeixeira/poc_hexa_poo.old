import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {SpecificationErrorResult} from "../../../../domain/core/Specification";
import {createTodoAsync} from "./useCases/createTodo";
import {Todo} from "../../../../domain/todoAggregate/Todo";
import {updateTodoAsync} from "./useCases/updateTodo";
import {deleteTodoAsync} from "./useCases/deleteTodo";
import {updateTodoStateAsync} from "./useCases/updateStateTodo";

export interface TodosState {
    items: Todo[];
    status: 'idle' | 'loading' | 'failed';
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
            .addMatcher(isAnyOf (createTodoAsync.pending, updateTodoAsync.pending, deleteTodoAsync.pending, updateTodoStateAsync.pending),
                (state) => {
                state.status = 'loading';
            })
            .addMatcher(isAnyOf (createTodoAsync.fulfilled, updateTodoAsync.fulfilled, deleteTodoAsync.fulfilled, updateTodoStateAsync.fulfilled),
                (state,action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addMatcher(isAnyOf (createTodoAsync.rejected, updateTodoAsync.rejected, deleteTodoAsync.rejected, updateTodoStateAsync.rejected), (state, action) => {
                state.status = 'failed';
                if (action.error.message) {
                    state.error = JSON.parse(action.error.message);
                }
            });
    },
});

export const selectTodos = (state: RootState) => state.todos.items;
export const selectTodoById = (todos: Todo[], id: string) => todos.find(todo => todo.id === id);


export default todosSlice.reducer;
