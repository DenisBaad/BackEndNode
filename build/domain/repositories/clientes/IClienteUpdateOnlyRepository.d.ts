import { ObjectId } from "mongodb";
import { Cliente } from '../../entities/Cliente';
export interface IClienteUpdateOnlyRepository {
    updateAsync(id: ObjectId, cliente: Cliente): Promise<void>;
}
//# sourceMappingURL=IClienteUpdateOnlyRepository.d.ts.map