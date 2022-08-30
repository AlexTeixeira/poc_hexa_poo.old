"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodo = void 0;
const Todo_1 = require("../../domain/todoAggregate/Todo");
class CreateTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    handleAsync(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = new Todo_1.Todo(id, title, description);
            yield this.todoRepository.createAsync(todo);
        });
    }
}
exports.CreateTodo = CreateTodo;
