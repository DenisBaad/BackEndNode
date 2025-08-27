"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenController {
    lifeTimeMinutesToken;
    securityKey;
    constructor(securityKey, lifeTimeMinutesToken) {
        this.securityKey = securityKey;
        this.lifeTimeMinutesToken = lifeTimeMinutesToken;
    }
    create(userId) {
        const payload = { userId };
        const token = jsonwebtoken_1.default.sign(payload, this.securityKey, {
            expiresIn: `${this.lifeTimeMinutesToken}m`,
            algorithm: 'HS256'
        });
        return token;
    }
    validate(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.securityKey, {
                algorithms: ['HS256']
            });
            if (typeof decoded === 'string')
                throw new Error('Token inválido');
            return decoded;
        }
        catch (err) {
            throw new Error('Token inválido ou expirado');
        }
    }
    getUserId(token) {
        const payload = this.validate(token);
        return payload.userId;
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map