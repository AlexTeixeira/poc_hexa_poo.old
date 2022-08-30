"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const DIContainerType_1 = __importDefault(require("../domain/DIContainerType"));
const InMemoryTodoRepository_1 = require("../infrastructure/repositories/InMemoryTodoRepository");
const prodContainer = new inversify_1.Container();
prodContainer.bind(DIContainerType_1.default.TodoRepository).to(InMemoryTodoRepository_1.InMemoryTodoRepository).inSingletonScope();
exports.default = prodContainer;
