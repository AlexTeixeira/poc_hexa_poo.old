import {Before, DataTable, Given} from "@cucumber/cucumber";
import {Todo} from "../../../src/domain/todoAggregate/Todo";
import {TodoRepository} from "../../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../../src/config/TestDIContainer";
import DIContainerType from "../../../src/domain/DIContainerType";

let todoRepository: TodoRepository;

Before(() => {
    todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
});

Given(/^todo exists$/, function (table: DataTable) {
    todoRepository.clear();

    table.hashes().forEach(async (todo: Todo) => {
        await todoRepository.createAsync(todo);
    });
});