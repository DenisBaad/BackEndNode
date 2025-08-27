import { ObjectId } from "mongodb";
import { Fatura } from "../../domain/entities/Fatura";
import { IFaturaReadOnlyRepository } from "../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import { IFaturaUpdateOnlyRepository } from "../../domain/repositories/faturas/IFaturaUpdateOnlyRepository";
import { IFaturaWriteOnlyRepository } from "../../domain/repositories/faturas/IFaturaWriteOnlyRepository";
import { ResponseFaturaJson } from "../../shared/communication/responses/faturas/ResponseFaturaJson";
import { ZeusContext } from "../database/ZeusContext";

export class FaturaRepository implements IFaturaWriteOnlyRepository, IFaturaReadOnlyRepository, IFaturaUpdateOnlyRepository {
    private readonly _context = ZeusContext.getMongoRepository(Fatura)
    
    async addAsync(fatura: Fatura): Promise<void> {
        await this._context.save(fatura);
    }

    async getAllAsync(usuarioId: string): Promise<ResponseFaturaJson[]> {
        return await this._context.find({where: {usuarioId}})
    }

    async getByIdAsync(_id: ObjectId): Promise<Fatura | null> {
        return await this._context.findOne({where: {_id}})
    }
    
    async updateAsync(_id: ObjectId, fatura: Fatura): Promise<void> {
        await this._context.update({_id}, fatura)
    }

    async getRelatorioFaturaPorCliente(usuarioId: string, dataAbertura?: Date, dataFechamento?: Date, status?: number, clientesIds?: string[]): Promise<Fatura[]> {
        const where: any = {
            usuarioId: usuarioId
        };
    
        if (status !== undefined && status !== null) {
            where.status = status;
        }
    
        if (clientesIds && clientesIds.length > 0) {
            where.clienteId = { $in: clientesIds.map(id => id) };
        }

        if (dataAbertura && dataFechamento) {
            where.$and = [
              { inicioVigencia: { $gte: dataAbertura } },
              { fimVigencia: { $lte: dataFechamento } }
            ];
        }
    
        const faturas = await this._context.find({ where });        
        return faturas;
    }
}
