import {TodoRepository} from "../../src/domain/todoAggregate/ports/TodoRepository";
import testContainer from "../../src/config/TestDIContainer";
import DIContainerType from "../../src/domain/DIContainerType";
import {Todo} from "../../src/domain/todoAggregate/Todo";
import {ChangeTodoState} from "../../src/application/useCases/ChangeTodoState";
import {TodoState} from "../../src/domain/todoAggregate/TodoState";

describe("updateTodo", () => {
    const todoId = "some-valid-guid";
    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = testContainer.get<TodoRepository>(DIContainerType.TodoRepository);

        todoRepository.createAsync(new Todo(todoId, "My first todo", "My first todo description"));
    });

    test("not found todo should raise an error", async () => {
        const changeTodoState = new ChangeTodoState(todoRepository);

        const func= async () => await changeTodoState.handleAsync("bad-guid", TodoState.InProgress);

        await expect(func).rejects.toThrow("Selected todo does not exist");
    });

    test.each([TodoState.New, TodoState.InProgress, TodoState.Done])
    ("valid todo should be updated", async (state: TodoState) => {
        const changeTodoState = new ChangeTodoState(todoRepository);

        await changeTodoState.handleAsync(todoId, state);

        const todo = await todoRepository.getByIdAsync(todoId);

        expect(todo?.state).toStrictEqual(state);
    });

});