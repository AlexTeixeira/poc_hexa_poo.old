import {Todo} from "../../src/domain/todoAggregate/Todo";
import {RootState, store} from "../../src/application/states/app/store";
import {createTodoAsync} from "../../src/application/states/features/todo/useCases/createTodo";
import {selectTodoById} from "../../src/application/states/features/todo/todosSlice";

describe("createTodo", () => {
    const todoGuid = "some-valid-guid";

    async function dispatchTodoAsync(title: string, description: string) {
        return store.dispatch(createTodoAsync({
            id: todoGuid,
            title: title,
            description: description,
        }));
    }

    async function dispatchTodoAndReturnErrorAsync(title: string, description: string) {
        await dispatchTodoAsync(title, description);

        return store.getState().todos.error;
    }

    test("unvalid title should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync("", "some valid description");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Title is required");
    });

    test("unvalid description should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync("My title", "");

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Description is required");
    });

    test("valid todo should be created", async () => {
        const todoAttempt = new Todo(todoGuid, "some valid title", "some valid description");

        await dispatchTodoAsync("some valid title", "some valid description");

        const todo = selectTodoById(store.getState().todos.items, todoGuid);

        expect(todo).toStrictEqual(todoAttempt);
    });
});