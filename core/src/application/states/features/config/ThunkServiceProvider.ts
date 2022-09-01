import prodContainer from "../../../../config/ProdDIContainer";
import {Container} from "inversify";
import testContainer from "../../../../config/TestDIContainer";

export type ServiceProviderType = {
    container: Container;
}

export const ThunkServiceProvider: ServiceProviderType = {
    container: process.env.NODE_ENV === "dev" ? prodContainer : testContainer
};