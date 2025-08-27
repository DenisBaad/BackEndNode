import { ObjectId } from "mongodb";
import { Cliente } from "../../domain/entities/Cliente";
import { IClienteReadOnlyRepository } from "../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { IClienteUpdateOnlyRepository } from "../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import { IClienteWriteOnlyRepository } from "../../domain/repositories/clientes/IClienteWriteOnlyRepository";
import { ResponseClienteJson } from "../../shared/communication/responses/clientes/ResponseClienteJson";
export declare class ClienteRepository implements IClienteWriteOnlyRepository, IClienteReadOnlyRepository, IClienteUpdateOnlyRepository {
    private readonly _context;
    addAsync(cliente: Cliente): Promise<void>;
    getAllAsync(usuarioId: string): Promise<ResponseClienteJson[]>;
    getByIdAsync(_id: ObjectId): Promise<Cliente | null>;
    updateAsync(_id: ObjectId, cliente: Cliente): Promise<void>;
}
//# sourceMappingURL=ClienteRepository.d.ts.map