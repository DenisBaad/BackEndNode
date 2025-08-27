import { ObjectId } from 'mongodb';
import { Usuario } from './../../entities/Usuario';

export interface IUsuarioWriteOnlyRepository {
  addAsync(usuario: Usuario): Promise<ObjectId>;
}
