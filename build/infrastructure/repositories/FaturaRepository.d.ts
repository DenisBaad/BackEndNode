import { ObjectId } from "mongodb";
import { Fatura } from "../../domain/entities/Fatura";
import { IFaturaReadOnlyRepository } from "../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import { IFaturaUpdateOnlyRepository } from "../../domain/repositories/faturas/IFaturaUpdateOnlyRepository";
import { IFaturaWriteOnlyRepository } from "../../domain/repositories/faturas/IFaturaWriteOnlyRepository";
import { ResponseFaturaJson } from "../../shared/communication/responses/faturas/ResponseFaturaJson";
export declare class FaturaRepository implements IFaturaWriteOnlyRepository, IFaturaReadOnlyRepository, IFaturaUpdateOnlyRepository {
    private readonly _context;
    addAsync(fatura: Fatura): Promise<void>;
    getAllAsync(usuarioId: string): Promise<ResponseFaturaJson[]>;
    getByIdAsync(_id: ObjectId): Promise<Fatura | null>;
    updateAsync(_id: ObjectId, fatura: Fatura): Promise<void>;
    getRelatorioFaturaPorCliente(usuarioId: string, dataAbertura?: Date, dataFechamento?: Date, status?: number, clientesIds?: string[]): Promise<Fatura[]>;
}
//# sourceMappingURL=FaturaRepository.d.ts.map