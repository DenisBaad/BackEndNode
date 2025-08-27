"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const tsyringe_1 = require("tsyringe");
const ZeusAuthorize_1 = require("../middlewares/ZeusAuthorize");
const usuariosRouter = (0, express_1.Router)();
usuariosRouter.post('/', async (req, res) => {
    const result = await tsyringe_1.container.resolve("ICreateUsuarioUseCase").execute(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
});
usuariosRouter.get('/', (0, ZeusAuthorize_1.zeusAuthorize)(), async (_req, res) => {
    const result = await tsyringe_1.container.resolve("IGetAllUsuarioUseCase").execute();
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.default = usuariosRouter;
//# sourceMappingURL=UsuariosController.js.map