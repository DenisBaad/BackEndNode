import { ObjectId } from "mongodb";
import { ResponsePlanoJson } from "../../../shared/communication/responses/planos/ResponsePlanoJson";
import { Plano } from "../../entities/Plano";
import { PagedResult } from "../../../shared/communication/responses/PagedResult";

export interface IPlanoReadOnlyRepository {
    getAllAsync(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponsePlanoJson>>
    getByIdAsync(id: ObjectId): Promise<Plano | null>
}