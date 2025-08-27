import { Usuario } from '../../../src/domain/entities/Usuario';
import { IUsuarioWriteOnlyRepository } from '../../../src/domain/repositories/usuarios/IUsuarioWriteOnlyRepository';
import { IUsuarioReadOnlyRepository } from '../../domain/repositories/usuarios/IUsuarioReadOnlyRepository';
import { ResponseUsuarioJson } from '../../shared/communication/responses/usuarios/ResponseUsuarioJson';
import { ObjectId } from "mongodb";
export declare class UsuarioRepository implements IUsuarioWriteOnlyRepository, IUsuarioReadOnlyRepository {
    private readonly _context;
    addAsync(usuario: Usuario): Promise<ObjectId>;
    getAllAsync(): Promise<ResponseUsuarioJson[]>;
    existUseWithEmailAsync(email: string): Promise<boolean>;
    existUserByEmailAndPasswordAsync(email: string, senha: string): Promise<Usuario | null>;
    getByIdAsync(_id: ObjectId): Promise<Usuario | null>;
}
//# sourceMappingURL=UsuarioRepository.d.ts.map