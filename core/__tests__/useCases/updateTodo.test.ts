import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {UpdateTodo} from "../../src/application/useCases/UpdateTodo";

describe("updateTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);

        todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });

    test("unvalid title should raise an error", async () => {
        const updateTodo = new UpdateTodo(todoRepository);

        const func= async () => await updateTodo.handleAsync(todoId, "", "some valid description");

        await expect(func).rejects.toThrow("Title is required");
    });

    test("unvalid description should raise an error", async () => {
        const updateTodo = new UpdateTodo(todoRepository);

        const func= async () => await updateTodo.handleAsync(todoId, "some valid title", "");

        await expect(func).rejects.toThrow("Description is required");
    });

    test("not found todo should raise an error", async () => {
        const updateTodo = new UpdateTodo(todoRepository);

        const func= async () => await updateTodo.handleAsync("not-found-todo", "some valid title", "some valid description");

        await expect(func).rejects.toThrow("Selected todo does not exist");
    });

    test("valid todo should be updated", async () => {
        const updateTodo = new UpdateTodo(todoRepository);

        const todoAttempt = new Todo(todoId, "some valid title", "some valid description");

        await updateTodo.handleAsync(todoId, "some valid title", "some valid description");

        const todo = await todoRepository.getByIdAsync(todoId);

        expect(todo).toStrictEqual(todoAttempt);
    });

});