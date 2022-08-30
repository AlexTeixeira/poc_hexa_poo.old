import {TodoRepository} from "../domain/todoAggregate/ports/TodoRepository";
import {Container} from "inversify";
import DIContainerType from "../domain/DIContainerType";
import {InMemoryTodoRepository} from "../infrastructure/repositories/InMemoryTodoRepository";

const prodContainer = new Container();
prodContainer.bind<TodoRepository>(DIContainerType.TodoRepository).to(InMemoryTodoRepository).inSingletonScope();

export default prodContainer;