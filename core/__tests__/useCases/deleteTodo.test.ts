import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {store} from "../../src/application/states/app/store";
import {deleteTodoAsync} from "../../src/application/states/features/todo/useCases/deleteTodo";
import {selectTodoById} from "../../src/application/states/features/todo/todosSlice";
import {resetTodoRepository} from "../../__acceptance_tests__/commons/BeforeHook";

describe("deleteTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;

    beforeEach(async () => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        resetTodoRepository(todoRepository);
        await todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });

    async function dispatchTodoAsync(id: string) {
        return store.dispatch(deleteTodoAsync(id));
    }

    async function dispatchTodoAndReturnErrorAsync(id: string) {
        await dispatchTodoAsync(id);

        return store.getState().todos.error;
    }

    test("not found todo should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync("not-found-todo");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Selected todo does not exist");
    });

    test("valid todo should be deleted", async () => {

       await dispatchTodoAsync(todoId);

        const todo = selectTodoById(store.getState().todos.items, todoId);

        expect(todo).toBeUndefined();
    });

});