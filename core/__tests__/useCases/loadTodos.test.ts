import testContainer from "../../src/config/TestDIContainer";
import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {store} from "../../src/application/states/app/store";
import {loadTodosAsync} from "../../src/application/states/features/todo/useCases/loadTodos";

describe("loadTodos", () => {
    const todoAttempt = new Todo("1", "title", "description");
    beforeAll(async () => {
        const todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        await todoRepository.createAsync(todoAttempt);
    });

    test("should load todos", async () => {
        await store.dispatch(loadTodosAsync());

        expect(store.getState().todos.items).toHaveLength(1);
        expect(store.getState().todos.items[0]).toStrictEqual(todoAttempt);

    });
});