import { ObjectId } from "mongodb";
import { ResponseUsuarioJson } from "../../../shared/communication/responses/usuarios/ResponseUsuarioJson";
import { Usuario } from "../../entities/Usuario";

export interface IUsuarioReadOnlyRepository {
    getAllAsync(): Promise<ResponseUsuarioJson[]>
    getByIdAsync(id: ObjectId): Promise<Usuario | null>
    existUseWithEmailAsync(email: string): Promise<boolean>
    existUserByEmailAndPasswordAsync(email: string, senha: string): Promise<Usuario | null>
}
 