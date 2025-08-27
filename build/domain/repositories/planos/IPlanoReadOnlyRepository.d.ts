import { ObjectId } from "mongodb";
import { ResponsePlanoJson } from "../../../shared/communication/responses/planos/ResponsePlanoJson";
import { Plano } from "../../entities/Plano";
export interface IPlanoReadOnlyRepository {
    getAllAsync(usuarioId: string): Promise<ResponsePlanoJson[]>;
    getByIdAsync(id: ObjectId): Promise<Plano | null>;
}
//# sourceMappingURL=IPlanoReadOnlyRepository.d.ts.map