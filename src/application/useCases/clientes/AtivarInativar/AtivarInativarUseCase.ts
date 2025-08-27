import { inject, injectable } from "tsyringe";
import { IAtivarInativarUseCase } from "./IAtivarInativarUseCase";
import type { IClienteUpdateOnlyRepository } from "../../../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { ObjectId } from "mongodb";
import { EnumStatusCliente } from "../../../../shared/communication/enums/EnumStatusCliente";

@injectable()
export class AtivarInativarUseCase implements IAtivarInativarUseCase {

    constructor(
        @inject("IClienteUpdateOnlyRepository") private readonly clienteUpdateRepository: IClienteUpdateOnlyRepository,
        @inject("IClienteReadOnlyRepository") private readonly clienteReadRepository: IClienteReadOnlyRepository) {}
    
        async execute(id: string): Promise<void> {
        const objectId = new ObjectId(id);
        
        const cliente = await this.clienteReadRepository.getByIdAsync(objectId);
        if (!cliente) throw new Error("Cliente não encontrado");

        if (cliente.status === EnumStatusCliente.Ativo) {
            cliente.status = EnumStatusCliente.Inativo
        } else {
            cliente.status = EnumStatusCliente.Ativo
        }

        await this.clienteUpdateRepository.updateAsync(objectId, cliente);
    }
}