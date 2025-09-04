import { PagedResult } from "../../../../shared/communication/responses/PagedResult";
import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";

export interface IGetAllPlanoUseCase {
    execute(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponsePlanoJson>>
}