"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const Cliente_1 = require("../../domain/entities/Cliente");
const ZeusContext_1 = require("../database/ZeusContext");
class ClienteRepository {
    _context = ZeusContext_1.ZeusContext.getMongoRepository(Cliente_1.Cliente);
    async addAsync(cliente) {
        await this._context.save(cliente);
    }
    async getAllAsync(usuarioId) {
        return await this._context.find({ where: { usuarioId } });
    }
    async getByIdAsync(_id) {
        return await this._context.findOne({ where: { _id } });
    }
    async updateAsync(_id, cliente) {
        await this._context.update({ _id }, cliente);
    }
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=ClienteRepository.js.map