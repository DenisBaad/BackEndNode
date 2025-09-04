import { ObjectId } from "mongodb";
import { ResponseClienteJson } from "../../../shared/communication/responses/clientes/ResponseClienteJson";
import { Cliente } from "../../entities/Cliente";
import { PagedResult } from "../../../shared/communication/responses/PagedResult";

export interface IClienteReadOnlyRepository {
    getAllAsync(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponseClienteJson>>
    getByIdAsync(id: ObjectId): Promise<Cliente | null>
}