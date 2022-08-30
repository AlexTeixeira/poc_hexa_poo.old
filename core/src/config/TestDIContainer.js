"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const DIContainerType_1 = __importDefault(require("../domain/DIContainerType"));
const InMemoryTodoRepository_1 = require("../infrastructure/repositories/InMemoryTodoRepository");
const ErrorDriverImpl_1 = require("../../__acceptance_tests__/commons/ErrorDriverImpl");
const testContainer = new inversify_1.Container();
testContainer.bind(DIContainerType_1.default.TodoRepository).to(InMemoryTodoRepository_1.InMemoryTodoRepository).inSingletonScope();
testContainer.bind(DIContainerType_1.default.ErrorDriver).to(ErrorDriverImpl_1.ErrorDriverImpl).inSingletonScope();
exports.default = testContainer;
