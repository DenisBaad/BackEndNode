import { ObjectId } from "mongodb";
import { Cliente } from "../../domain/entities/Cliente";
import { IClienteReadOnlyRepository } from "../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { IClienteUpdateOnlyRepository } from "../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import { IClienteWriteOnlyRepository } from "../../domain/repositories/clientes/IClienteWriteOnlyRepository";
import { ResponseClienteJson } from "../../shared/communication/responses/clientes/ResponseClienteJson";
import { ZeusContext } from "../database/ZeusContext";

export class ClienteRepository implements IClienteWriteOnlyRepository, IClienteReadOnlyRepository, IClienteUpdateOnlyRepository {
    private readonly _context = ZeusContext.getMongoRepository(Cliente);
    
    async addAsync(cliente: Cliente): Promise<void> {
        await this._context.save(cliente);
    }

    async getAllAsync(usuarioId: string): Promise<ResponseClienteJson[]> {
        return await this._context.find({where: {usuarioId}});
    }

    async getByIdAsync(_id: ObjectId): Promise<Cliente | null> {
        return await this._context.findOne({where: {_id}})
    }

    async updateAsync(_id: ObjectId, cliente: Cliente): Promise<void> {
        await this._context.update({_id}, cliente)
    }
}