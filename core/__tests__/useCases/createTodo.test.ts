import {CreateTodo} from "../../src/application/useCases/CreateTodo";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import DIContainerType from "../../src/domain/DIContainerType";
import testContainer from "../../src/config/TestDIContainer";

describe("createTodo", () => {
    const todoGuid = "some-valid-guid";

    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
    })


    test("unvalid title should raise an error", async () => {
        const createTodo = new CreateTodo(todoRepository);

        const func= async () => await createTodo.handleAsync(todoGuid, "", "some valid description");

        await expect(func).rejects.toThrow("Title is required");
    });

    test("unvalid description should raise an error", async () => {
        const createTodo = new CreateTodo(todoRepository);

        const func= async () => await createTodo.handleAsync(todoGuid, "some valid title", "");

        await expect(func).rejects.toThrow("Description is required");
    });

    test("valid todo should be created", async () => {
        const createTodo = new CreateTodo(todoRepository);

        const todoAttempt = new Todo(todoGuid, "some valid title", "some valid description");

        await createTodo.handleAsync(todoGuid, "some valid title", "some valid description");

        const todo = await todoRepository.getByIdAsync(todoGuid);

        expect(todo).toStrictEqual(todoAttempt);
    });
});