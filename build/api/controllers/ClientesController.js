"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const http_status_codes_1 = require("http-status-codes");
const clientesRouter = (0, express_1.Router)();
clientesRouter.post('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("ICreateClienteUseCase").execute(usuarioId, req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
});
clientesRouter.get('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("IGetAllClienteUseCase").execute(usuarioId);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
clientesRouter.put('/:id', async (req, res) => {
    await tsyringe_1.container.resolve("IEditClienteUseCase").execute(req.params.id, req.body);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
clientesRouter.patch('/:id', async (req, res) => {
    await tsyringe_1.container.resolve("IAtivarInativarUseCase").execute(req.params.id);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
exports.default = clientesRouter;
//# sourceMappingURL=ClientesController.js.map