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
exports.DeleteTodo = void 0;
class DeleteTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    handleAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepository.getByIdAsync(id);
            if (todo == null) {
                throw new Error("Selected todo does not exist");
            }
            yield this.todoRepository.deleteAsync(id);
        });
    }
}
exports.DeleteTodo = DeleteTodo;
