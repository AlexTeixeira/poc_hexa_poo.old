import {Before, Given, Then, When} from "@cucumber/cucumber";
import {ErrorDriver} from "../../commons/ErrorDriver";
import testContainer from "../../../src/config/TestDIContainer";
import {TodoRepository} from "../../../src/domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../../src/domain/DIContainerType";
import {UpdateTodo} from "../../../src/application/useCases/UpdateTodo";
import {Todo} from "../../../src/domain/todoAggregate/Todo";
import {TodoConstant} from "./todoConstants";
import {expect} from "expect";

let todoTitle: string = "";
let todoDescription: string = "";

let todoAttempt: Todo | undefined;
let todoRepository: TodoRepository;
let errorDriver: ErrorDriver;

Before(() => {
    todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    errorDriver = testContainer.get<ErrorDriver>(DIContainerType.ErrorDriver);
})

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
    const createTodo = new UpdateTodo(todoRepository);

    await errorDriver.handleError(async () => {
        await createTodo.handleAsync(TodoConstant.todoId, todoTitle, todoDescription);
    })
});

Then(/^the todo should be updated$/, async function () {
    const todo = await todoRepository.getByIdAsync(TodoConstant.todoId);
    expect(todo).toStrictEqual(todoAttempt);
});
