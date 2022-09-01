import {Then} from "@cucumber/cucumber";
import {expect} from "expect";
import {store} from "../../../src/application/states/app/store";
import {SpecificationErrorResult} from "../../../src/domain/core/Specification";

Then(/^I should be noticed with "([^"]*)"$/, function (message: string) {
    const error: SpecificationErrorResult | undefined = store.getState().todos.error;
    expect(error).toBeDefined();
    expect(error?.message).toContain(message);
});
