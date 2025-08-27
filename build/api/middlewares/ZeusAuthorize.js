"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeusAuthorize = zeusAuthorize;
const tsyringe_1 = require("tsyringe");
function zeusAuthorize() {
    return async (req, res, next) => {
        try {
            const tokenController = tsyringe_1.container.resolve("TokenController");
            const authHeader = req.headers['authorization'];
            if (!authHeader)
                return res.status(401).json({ error: 'Token não informado' });
            const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
            const userId = tokenController.getUserId(token);
            req.userId = userId;
            next();
        }
        catch (error) {
            if (error.message.includes('expirado')) {
                return res.status(401).json({ error: 'Token expirado' });
            }
            return res.status(401).json({ error: 'Usuário sem permissão' });
        }
    };
}
//# sourceMappingURL=ZeusAuthorize.js.map