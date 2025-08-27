"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const tsyringe_1 = require("tsyringe");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', async (req, res) => {
    const result = await tsyringe_1.container.resolve("ILoginUseCase").execute(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.default = loginRouter;
//# sourceMappingURL=LoginController.js.map