import {Before, Given, Then, When} from "@cucumber/cucumber";
import {Todo} from "../../../src/domain/todoAggregate/Todo";
import {TodoConstant} from "./todoConstants.steps";
import {expect} from "expect";
import {store} from "../../../src/application/states/app/store";
import {updateTodoAsync} from "../../../src/application/states/features/todo/useCases/updateTodo";
import {selectTodoById} from "../../../src/application/states/features/todo/todosSlice";

let todoTitle: string = "";
let todoDescription: string = "";

let todoAttempt: Todo | undefined;

Given(/^the todo "([^"]*)"$/, function (id: string) {
    TodoConstant.todoId = id;
});
Given(/^I change the todo with (.*) and (.*)$/, function (title: string, description: string) {
    todoTitle = title;
    todoDescription = description;
});
When(/^I update the todo$/, async function () {
    if (todoTitle !== "" && todoDescription !== "") {
        todoAttempt = new Todo(TodoConstant.todoId, todoTitle, todoDescription);
    }

    await store.dispatch(updateTodoAsync({
        id: TodoConstant.todoId,
        title: todoTitle,
        description: todoDescription,
    }));
});

Then(/^the todo should be updated$/, async function () {
    const todo = selectTodoById(store.getState().todos.items, TodoConstant.todoId);
    expect(todo).toStrictEqual(todoAttempt);
});
