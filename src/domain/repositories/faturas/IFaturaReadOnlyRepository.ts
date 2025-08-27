import { ObjectId } from "mongodb";
import { ResponseFaturaJson } from "../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { Fatura } from "../../entities/Fatura";

export interface IFaturaReadOnlyRepository {
    getAllAsync(usuarioId: string): Promise<ResponseFaturaJson[]>
    getByIdAsync(id: ObjectId): Promise<Fatura | null>
    getRelatorioFaturaPorCliente(usuarioId: string, dataAbertura?: Date, dataFechamento?: Date, status?: number, clientesIds?: string[]): Promise<Fatura[]>
}