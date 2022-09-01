import {Given, Then, When} from "@cucumber/cucumber";
import {Todo} from "../../../src/domain/todoAggregate/Todo";
import {expect} from "expect";
import {store} from "../../../src/application/states/app/store";
import {createTodoAsync} from "../../../src/application/states/features/todo/useCases/createTodo";
import {selectTodoById} from "../../../src/application/states/features/todo/todosSlice";

let todoTitle: string = "";
let todoDescription: string = "";
let todoAttempt: Todo | undefined;
const todoId = "some-valid-guid";

function dispatchTodoAsync(title: string, description: string) {
    return store.dispatch(createTodoAsync({
        id: todoId,
        title: title,
        description: description,
    }));
}

Given(/^I have a todo with (.*) and (.*)$/, function (title?: string, description?: string) {
    todoTitle = title ?? "";
    todoDescription = description ?? "";
});

When('I create the todo', async function () {
    if (todoTitle !== "" && todoDescription !== "") {
        todoAttempt = new Todo(todoId, todoTitle, todoDescription);
    }

    await dispatchTodoAsync(todoTitle, todoDescription);

});

Then('Todo should be created', async function () {
    const todo = selectTodoById(store.getState().todos.items, todoId);

    expect(todo).toStrictEqual(todoAttempt);
});
