import {Before, Given, Then, When} from "@cucumber/cucumber";
import {Todo} from "../../../src/domain/todoAggregate/Todo";
import {ErrorDriver} from "../../commons/ErrorDriver";
import {TodoRepository} from "../../../src/domain/todoAggregate/ports/TodoRepository";
import {CreateTodo} from "../../../src/application/useCases/CreateTodo";
import testContainer from "../../../src/config/TestDIContainer";
import DIContainerType from "../../../src/domain/DIContainerType";
import {expect} from "expect";

let todoTitle: string = "";
let todoDescription: string = "";
let todoAttempt: Todo | undefined;
let errorDriver: ErrorDriver;
let todoRepository: TodoRepository;
const todoId = "some-valid-guid";


Before(() => {
    todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    errorDriver = testContainer.get<ErrorDriver>(DIContainerType.ErrorDriver);
});


Given(/^I have a todo with (.*) and (.*)$/, function (title?: string, description?: string) {
    todoTitle = title ?? "";
    todoDescription = description ?? "";
});

When('I create the todo', async function () {
    if (todoTitle !== "" && todoDescription !== "") {
        todoAttempt = new Todo(todoId, todoTitle, todoDescription);
    }
    const createTodo = new CreateTodo(todoRepository);

    await errorDriver.handleError(async () => {
        await createTodo.handleAsync(todoId, todoTitle, todoDescription);
    })
});

Then('Todo should be created', async function () {
    const todo = await todoRepository.getByIdAsync(todoId);
    expect(todo).toStrictEqual(todoAttempt);
});
