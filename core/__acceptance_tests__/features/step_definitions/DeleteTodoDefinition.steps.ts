import {Before, Then, When} from "@cucumber/cucumber";
import {TodoConstant} from "./todoConstants.steps";
import {ErrorDriver} from "../../commons/ErrorDriver";
import testContainer from "../../../src/config/TestDIContainer";
import DIContainerType from "../../../src/domain/DIContainerType";
import {store} from "../../../src/application/states/app/store";
import {deleteTodoAsync} from "../../../src/application/states/features/todo/useCases/deleteTodo";
import {selectTodoById} from "../../../src/application/states/features/todo/todosSlice";
import {expect} from "expect";

let errorDriver: ErrorDriver;

Before(() => {
    errorDriver = testContainer.get<ErrorDriver>(DIContainerType.ErrorDriver);
})

When(/^I delete the todo$/, async function () {
    await store.dispatch(deleteTodoAsync(TodoConstant.todoId));
});

Then(/^the todo should be deleted$/, async function () {
    const todo = selectTodoById(store.getState().todos.items, TodoConstant.todoId);

    expect(todo).toBeUndefined();
});