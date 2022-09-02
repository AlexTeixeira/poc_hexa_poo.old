import {Then, When} from "@cucumber/cucumber";
import {TodoStatus} from "../../../src/domain/todoAggregate/TodoStatus";
import {store} from "../../../src/application/states/app/store";
import {TodoConstant} from "./todoConstants.steps";
import {updateTodoStateAsync} from "../../../src/application/states/features/todo/useCases/updateStateTodo";
import {selectTodoById} from "../../../src/application/states/features/todo/todosSlice";
import {expect} from "expect";

let todoState: TodoStatus = TodoStatus.New;

When(/^I update the status to "([^"]*)"$/, async function (state: TodoStatus) {
    todoState = state;
    await store.dispatch(updateTodoStateAsync({
        id: TodoConstant.todoId,
        state: todoState,
    }));
});
Then(/^the todo should have the correct status$/, function () {
    const todo = selectTodoById(store.getState().todos.items, TodoConstant.todoId);
    expect(todo?.state).toStrictEqual(todoState);
});