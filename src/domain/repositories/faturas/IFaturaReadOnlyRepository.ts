import { ObjectId } from "mongodb";
import { ResponseFaturaJson } from "../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { Fatura } from "../../entities/Fatura";
import { PagedResult } from "../../../shared/communication/responses/PagedResult";

export interface IFaturaReadOnlyRepository {
    getAllAsync(usuarioId: string, pageNumber: number, pageSize: number): Promise<PagedResult<ResponseFaturaJson>>
    getByIdAsync(id: ObjectId): Promise<Fatura | null>
    getRelatorioFaturaPorCliente(usuarioId: string, dataAbertura?: Date, dataFechamento?: Date, status?: number, clientesIds?: string[]): Promise<Fatura[]>
}