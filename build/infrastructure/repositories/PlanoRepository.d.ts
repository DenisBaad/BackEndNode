import { ObjectId } from "mongodb";
import { Plano } from "../../domain/entities/Plano";
import { IPlanoReadOnlyRepository } from "../../domain/repositories/planos/IPlanoReadOnlyRepository";
import { IPlanoUpdateOnlyRepository } from "../../domain/repositories/planos/IPlanoUpdateOnlyRepository";
import { IPlanoWriteOnlyRepository } from "../../domain/repositories/planos/IPlanoWriteOnlyRepository";
import { ResponsePlanoJson } from "../../shared/communication/responses/planos/ResponsePlanoJson";
export declare class PlanoRepository implements IPlanoWriteOnlyRepository, IPlanoReadOnlyRepository, IPlanoUpdateOnlyRepository {
    private readonly _context;
    addAsync(plano: Plano): Promise<void>;
    getAllAsync(usuarioId: string): Promise<ResponsePlanoJson[]>;
    getByIdAsync(_id: ObjectId): Promise<Plano | null>;
    updateAsync(_id: ObjectId, plano: Plano): Promise<void>;
}
//# sourceMappingURL=PlanoRepository.d.ts.map