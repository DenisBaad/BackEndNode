import { ObjectId } from "mongodb";
import { Fatura } from "../../entities/Fatura";
export interface IFaturaUpdateOnlyRepository {
    updateAsync(id: ObjectId, fatura: Fatura): Promise<void>;
}
//# sourceMappingURL=IFaturaUpdateOnlyRepository.d.ts.map