import { ObjectId } from "mongodb";
import { ResponseClienteJson } from "../../../shared/communication/responses/clientes/ResponseClienteJson";
import { Cliente } from "../../entities/Cliente";

export interface IClienteReadOnlyRepository {
    getAllAsync(usuarioId: string): Promise<ResponseClienteJson[]>
    getByIdAsync(id: ObjectId): Promise<Cliente | null>
}