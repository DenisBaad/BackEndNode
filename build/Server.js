"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes/routes"));
const cors_1 = __importDefault(require("cors"));
const DependencyInjection_1 = require("./application/DependencyInjection");
const DependencyInjection_2 = require("./infrastructure/DependencyInjection");
const ExceptionFilter_1 = require("./api/middlewares/ExceptionFilter");
(0, DependencyInjection_2.registerInfrastructureDependencies)();
(0, DependencyInjection_1.registerApplicationDependencies)();
const server = (0, express_1.default)();
exports.server = server;
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(routes_1.default);
server.use(ExceptionFilter_1.errorHandler);
//# sourceMappingURL=Server.js.map