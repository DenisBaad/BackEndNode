"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeusContext = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../../domain/entities/Usuario");
const Plano_1 = require("../../domain/entities/Plano");
const Cliente_1 = require("../../domain/entities/Cliente");
const Fatura_1 = require("../../domain/entities/Fatura");
exports.ZeusContext = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [Usuario_1.Usuario, Plano_1.Plano, Cliente_1.Cliente, Fatura_1.Fatura],
});
//# sourceMappingURL=ZeusContext.js.map