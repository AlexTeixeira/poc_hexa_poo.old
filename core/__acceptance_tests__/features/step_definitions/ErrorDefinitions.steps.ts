import {Then} from "@cucumber/cucumber";
import testContainer from "../../../src/config/TestDIContainer";
import DIContainerType from "../../../src/domain/DIContainerType";
import {ErrorDriver} from "../../commons/ErrorDriver";
import {expect} from "expect";

Then(/^I should be noticed with "([^"]*)"$/, function (message: string) {
    const errorDriver = testContainer.get<ErrorDriver>(DIContainerType.ErrorDriver);
    const lastError: Error = errorDriver.getLastError();
    expect(lastError.message).toContain(message);
});
