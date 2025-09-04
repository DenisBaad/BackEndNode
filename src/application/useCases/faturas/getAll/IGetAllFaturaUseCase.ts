import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { PagedResult } from "../../../../shared/communication/responses/PagedResult";

export interface IGetAllFaturaUseCase {
    execute(usuarioId: string, pageNumber: number, pageSize: number): Promise<PagedResult<ResponseFaturaJson>>
}