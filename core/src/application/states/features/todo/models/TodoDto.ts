import {TodoStatus} from "../../../../../domain/todoAggregate/TodoStatus";

export interface TodoDto {
    id: string;
    title: string;
    description: string;
    state?: TodoStatus;
}