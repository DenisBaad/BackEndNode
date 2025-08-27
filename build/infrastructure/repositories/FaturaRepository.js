"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaturaRepository = void 0;
const Fatura_1 = require("../../domain/entities/Fatura");
const ZeusContext_1 = require("../database/ZeusContext");
class FaturaRepository {
    _context = ZeusContext_1.ZeusContext.getMongoRepository(Fatura_1.Fatura);
    async addAsync(fatura) {
        await this._context.save(fatura);
    }
    async getAllAsync(usuarioId) {
        return await this._context.find({ where: { usuarioId } });
    }
    async getByIdAsync(_id) {
        return await this._context.findOne({ where: { _id } });
    }
    async updateAsync(_id, fatura) {
        await this._context.update({ _id }, fatura);
    }
    async getRelatorioFaturaPorCliente(usuarioId, dataAbertura, dataFechamento, status, clientesIds) {
        const where = {
            usuarioId: usuarioId
        };
        if (status !== undefined && status !== null) {
            where.status = status;
        }
        if (clientesIds && clientesIds.length > 0) {
            where.clienteId = { $in: clientesIds.map(id => id) };
        }
        if (dataAbertura && dataFechamento) {
            where.$and = [
                { inicioVigencia: { $gte: dataAbertura } },
                { fimVigencia: { $lte: dataFechamento } }
            ];
        }
        const faturas = await this._context.find({ where });
        return faturas;
    }
}
exports.FaturaRepository = FaturaRepository;
//# sourceMappingURL=FaturaRepository.js.map