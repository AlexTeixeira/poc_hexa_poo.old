import {Before, Then, When} from "@cucumber/cucumber";
import {TodoConstant} from "./todoConstants";
import {TodoRepository} from "../../../src/domain/todoAggregate/ports/TodoRepository";
import {DeleteTodo} from "../../../src/application/useCases/DeleteTodo";
import {ErrorDriver} from "../../commons/ErrorDriver";
import testContainer from "../../../src/config/TestDIContainer";
import DIContainerType from "../../../src/domain/DIContainerType";
let todoRepository: TodoRepository;
let errorDriver: ErrorDriver;

Before(() => {
    todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    errorDriver = testContainer.get<ErrorDriver>(DIContainerType.ErrorDriver);
})

When(/^I delete the todo$/, async function () {
    const deleteTodo = new DeleteTodo(todoRepository);

    await errorDriver.handleError(async () => {
        await deleteTodo.handleAsync(TodoConstant.todoId);
    })
});

Then(/^the todo should be deleted$/, async function () {
    await todoRepository.deleteAsync(TodoConstant.todoId);
});