"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const Usuario_1 = require("../../../src/domain/entities/Usuario");
const ZeusContext_1 = require("../database/ZeusContext");
class UsuarioRepository {
    _context = ZeusContext_1.ZeusContext.getMongoRepository(Usuario_1.Usuario);
    async addAsync(usuario) {
        const result = await this._context.save(usuario);
        return result._id;
    }
    async getAllAsync() {
        const usuarios = await this._context.find();
        return usuarios.map(({ senha, ...resto }) => ({ ...resto }));
    }
    async existUseWithEmailAsync(email) {
        const usuario = await this._context.findOne({ where: { email } });
        return usuario ? true : false;
    }
    async existUserByEmailAndPasswordAsync(email, senha) {
        const usuario = await this._context.findOne({
            where: {
                email: email,
                senha: senha,
            },
        });
        return usuario;
    }
    async getByIdAsync(_id) {
        return await this._context.findOne({ where: { _id } });
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=UsuarioRepository.js.map