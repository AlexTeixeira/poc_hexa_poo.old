import {TodoState} from "../../../../../domain/todoAggregate/TodoState";

export interface TodoDto {
    id: string;
    title: string;
    description: string;
    state?: TodoState;
}