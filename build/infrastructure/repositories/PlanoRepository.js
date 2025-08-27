"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoRepository = void 0;
const Plano_1 = require("../../domain/entities/Plano");
const ZeusContext_1 = require("../database/ZeusContext");
class PlanoRepository {
    _context = ZeusContext_1.ZeusContext.getMongoRepository(Plano_1.Plano);
    async addAsync(plano) {
        await this._context.save(plano);
    }
    async getAllAsync(usuarioId) {
        return await this._context.find({ where: { usuarioId } });
    }
    async getByIdAsync(_id) {
        return await this._context.findOne({ where: { _id } });
    }
    async updateAsync(_id, plano) {
        await this._context.update({ _id }, plano);
    }
}
exports.PlanoRepository = PlanoRepository;
//# sourceMappingURL=PlanoRepository.js.map