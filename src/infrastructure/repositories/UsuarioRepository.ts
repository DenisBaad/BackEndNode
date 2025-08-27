import { Usuario } from '../../../src/domain/entities/Usuario';
import { IUsuarioWriteOnlyRepository } from '../../../src/domain/repositories/usuarios/IUsuarioWriteOnlyRepository';
import { IUsuarioReadOnlyRepository } from '../../domain/repositories/usuarios/IUsuarioReadOnlyRepository';
import { ResponseUsuarioJson } from '../../shared/communication/responses/usuarios/ResponseUsuarioJson';
import { ZeusContext } from '../database/ZeusContext';
import { ObjectId } from "mongodb";

export class UsuarioRepository implements IUsuarioWriteOnlyRepository, IUsuarioReadOnlyRepository {
    private readonly _context = ZeusContext.getMongoRepository(Usuario);
      
    async addAsync(usuario: Usuario): Promise<ObjectId> {
      const result = await this._context.save(usuario);
      return result._id;
    }
  
    async getAllAsync(): Promise<ResponseUsuarioJson[]> {
      const usuarios = await this._context.find();
      return usuarios.map(({ senha, ...resto }) => ({ ...resto }));
    }
  
    async existUseWithEmailAsync(email: string): Promise<boolean> {
      const usuario = await this._context.findOne({where: { email }});
      return usuario ? true : false;
    }
  
    async existUserByEmailAndPasswordAsync(email: string, senha: string): Promise<Usuario | null> {
      const usuario = await this._context.findOne({
        where: {
          email: email,
          senha: senha,
        },
      });
    
      return usuario; 
    }
  
    async getByIdAsync(_id: ObjectId): Promise<Usuario | null> {
      return await this._context.findOne({where: { _id }});
    }
}
