import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { PagedResult } from "../../../../shared/communication/responses/PagedResult";

export interface IGetAllClienteUseCase {
    execute(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponseClienteJson>>
}