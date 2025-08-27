import "reflect-metadata";
import 'dotenv/config';
import express from 'express';
import routes from './api/routes/routes';
import cors from 'cors';
import { registerApplicationDependencies } from './application/DependencyInjection';
import { registerInfrastructureDependencies } from './infrastructure/DependencyInjection';
import { errorHandler } from "./api/middlewares/ExceptionFilter";

registerInfrastructureDependencies();
registerApplicationDependencies();

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

server.use(errorHandler);

export { server }