import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {store} from "../../src/application/states/app/store";
import {updateTodoAsync} from "../../src/application/states/features/todo/useCases/updateTodo";
import {selectTodoById} from "../../src/application/states/features/todo/todosSlice";
import {resetTodoRepository} from "../../__acceptance_tests__/commons/BeforeHook";

describe("updateTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;


    beforeEach(async() => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        resetTodoRepository(todoRepository);
        await todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });


    async function dispatchTodoAsync(id: string, title: string, description: string) {
        return store.dispatch(updateTodoAsync({
            id: id,
            title: title,
            description: description,
        }));
    }

    async function dispatchTodoAndReturnErrorAsync(id: string, title: string, description: string) {
        await dispatchTodoAsync(id, title, description);

        return store.getState().todos.error;
    }

    test("unvalid title should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync(todoId,"", "some valid description");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Title is required");
    });

    test("unvalid description should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync(todoId,"My title", "");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Description is required");
    });

    test("not found todo should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync("not-found-todo", "some valid title", "some valid description");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Selected todo does not exist");
    });

    test("valid todo should be updated", async () => {
        const todoAttempt = new Todo(todoId, "some valid title", "some valid description");

        await dispatchTodoAsync(todoId, "some valid title", "some valid description");

        const todo = selectTodoById(store.getState().todos.items, todoId);

        expect(todo).toStrictEqual(todoAttempt);
    });

});