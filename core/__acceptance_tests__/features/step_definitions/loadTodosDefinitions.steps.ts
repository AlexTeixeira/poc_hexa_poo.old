import {DataTable, Then, When} from "@cucumber/cucumber";
import {store} from "../../../src/application/states/app/store";
import {loadTodosAsync} from "../../../src/application/states/features/todo/useCases/loadTodos";
import {expect} from "expect";

When(/^I load todos$/, async function () {
    await store.dispatch(loadTodosAsync());
});
Then(/^I should see todos$/, function (table: DataTable) {
    const expectedTodos = table.hashes();
    const actualTodos = store.getState().todos.items;
    expect(actualTodos).toHaveLength(expectedTodos.length);
    expectedTodos.forEach((expectedTodo, index) => {
        expect(actualTodos[index]).toStrictEqual(expectedTodo);
    });
});