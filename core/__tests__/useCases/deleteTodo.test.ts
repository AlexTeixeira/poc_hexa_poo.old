import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {UpdateTodo} from "../../src/application/useCases/UpdateTodo";
import {DeleteTodo} from "../../src/application/useCases/DeleteTodo";

describe("deleteTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);

        todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });

    test("not found todo should raise an error", async () => {
        const deleteTodo = new DeleteTodo(todoRepository);

        const func= async () => await deleteTodo.handleAsync("not-found-todo");

        await expect(func).rejects.toThrow("Selected todo does not exist");
    });

    test("valid todo should be deleted", async () => {
        const deleteTodo = new DeleteTodo(todoRepository);

        await deleteTodo.handleAsync(todoId);

        const todo = await todoRepository.getByIdAsync(todoId);

        expect(todo).toBeUndefined();
    });

});