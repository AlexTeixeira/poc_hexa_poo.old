import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {TodoStatus} from "../../src/domain/todoAggregate/TodoStatus";
import {store} from "../../src/application/states/app/store";
import {updateTodoStateAsync} from "../../src/application/states/features/todo/useCases/updateStateTodo";
import {selectTodoById} from "../../src/application/states/features/todo/todosSlice";
import {resetTodoRepository} from "../../__acceptance_tests__/commons/BeforeHook";


describe("updateTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;


    async function dispatchTodoAsync(id: string, state: TodoStatus) {
        return store.dispatch(updateTodoStateAsync({
            id: id,
            state: state,
        }));
    }

    async function dispatchTodoAndReturnErrorAsync(id: string, state: TodoStatus) {
        await dispatchTodoAsync(id, state);

        return store.getState().todos.error;
    }

    beforeEach(async () => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);
        resetTodoRepository(todoRepository);
        await todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });

    test("not found todo should raise an error", async () => {
        const error = await dispatchTodoAndReturnErrorAsync("bad-guid", TodoStatus.InProgress);

        await expect(error).toBeDefined();
        // @ts-ignore
        expect(error.errors.map(err => err.message)).toContain("Selected todo does not exist");
    });

    test.each([TodoStatus.New, TodoStatus.InProgress, TodoStatus.Done])
    ("valid todo should be updated", async (state: TodoStatus) => {
        await dispatchTodoAsync(todoId, state);

        const todo = selectTodoById(store.getState().todos.items, todoId);

        expect(todo?.state).toStrictEqual(state);
    });

});