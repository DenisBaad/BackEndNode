"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const http_status_codes_1 = require("http-status-codes");
const planosRouter = (0, express_1.Router)();
planosRouter.post('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("ICreatePlanoUseCase").execute(usuarioId, req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
});
planosRouter.get('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("IGetAllPlanoUseCase").execute(usuarioId);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
planosRouter.put('/:id', async (req, res) => {
    await tsyringe_1.container.resolve("IEditPlanoUseCase").execute(req.params.id, req.body);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
exports.default = planosRouter;
//# sourceMappingURL=PlanosController.js.map