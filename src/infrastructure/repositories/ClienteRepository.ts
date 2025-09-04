import { ObjectId } from "mongodb";
import { Cliente } from "../../domain/entities/Cliente";
import { IClienteReadOnlyRepository } from "../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { IClienteUpdateOnlyRepository } from "../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import { IClienteWriteOnlyRepository } from "../../domain/repositories/clientes/IClienteWriteOnlyRepository";
import { ResponseClienteJson } from "../../shared/communication/responses/clientes/ResponseClienteJson";
import { ZeusContext } from "../database/ZeusContext";
import { PagedResult } from "../../shared/communication/responses/PagedResult";

export class ClienteRepository implements IClienteWriteOnlyRepository, IClienteReadOnlyRepository, IClienteUpdateOnlyRepository {
    private readonly _context = ZeusContext.getMongoRepository(Cliente);
    
    async addAsync(cliente: Cliente): Promise<void> {
        await this._context.save(cliente);
    }

    async getAllAsync(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponseClienteJson>> {
        const where: any = { usuarioId };

        if (search && search.trim() !== "") {
            where.nome = { $regex: search, $options: "i" };
        }

        const totalCount = await this._context.countDocuments(where);
        const items = await this._context.find({
            where,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
        });

        return new PagedResult<ResponseClienteJson>(items, totalCount);
    }

    async getByIdAsync(_id: ObjectId): Promise<Cliente | null> {
        return await this._context.findOne({where: {_id}})
    }

    async updateAsync(_id: ObjectId, cliente: Cliente): Promise<void> {
        await this._context.update({_id}, cliente)
    }
}