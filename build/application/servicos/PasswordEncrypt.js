"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordEncrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
class PasswordEncrypt {
    chaveAdicional;
    constructor() {
        this.chaveAdicional = process.env.CHAVE_ADICIONAL || "default_secret";
    }
    encript(senha) {
        const senhaComChave = senha + this.chaveAdicional;
        const hash = crypto_1.default.createHash("sha512").update(senhaComChave, "utf8").digest("hex");
        return hash;
    }
}
exports.PasswordEncrypt = PasswordEncrypt;
//# sourceMappingURL=PasswordEncrypt.js.map