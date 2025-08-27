"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const http_status_codes_1 = require("http-status-codes");
const faturasRouter = (0, express_1.Router)();
faturasRouter.post('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("ICreateFaturaUseCase").execute(usuarioId, req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
});
faturasRouter.get('/', async (req, res) => {
    const usuarioId = req.userId;
    const result = await tsyringe_1.container.resolve("IGetAllFaturaUseCase").execute(usuarioId);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
faturasRouter.put('/:id', async (req, res) => {
    await tsyringe_1.container.resolve("IEditFaturaUseCase").execute(req.params.id, req.body);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
faturasRouter.get('/gerar-relatorio-faturas-clientes', async (req, res) => {
    const usuarioId = req.userId;
    const usuarioNome = req.query.usuarioNome;
    const dataAbertura = req.query.dataAbertura ? new Date(req.query.dataAbertura) : undefined;
    const dataFechamento = req.query.dataFechamento ? new Date(req.query.dataFechamento) : undefined;
    const status = req.query.status !== undefined ? Number(req.query.status) : undefined;
    const clienteIds = [req.query.clienteId].flat().filter(Boolean);
    const result = await tsyringe_1.container.resolve("IRelatorioFaturasUseCase").executar(usuarioId, usuarioNome, dataAbertura, dataFechamento, status, clienteIds);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=relatorio_faturas.pdf");
    return res.status(http_status_codes_1.StatusCodes.OK).send(result);
});
exports.default = faturasRouter;
//# sourceMappingURL=FaturasController.js.map