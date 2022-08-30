import {TodoRepository} from "../domain/todoAggregate/ports/TodoRepository";
import {Container} from "inversify";
import DIContainerType from "../domain/DIContainerType";
import {InMemoryTodoRepository} from "../infrastructure/repositories/InMemoryTodoRepository";
import {ErrorDriver} from "../../__acceptance_tests__/commons/ErrorDriver";
import {ErrorDriverImpl} from "../../__acceptance_tests__/commons/ErrorDriverImpl";

const testContainer = new Container();
testContainer.bind<TodoRepository>(DIContainerType.TodoRepository).to(InMemoryTodoRepository).inSingletonScope();
testContainer.bind<ErrorDriver>(DIContainerType.ErrorDriver).to(ErrorDriverImpl).inSingletonScope();

export default testContainer;