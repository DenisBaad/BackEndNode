import { ObjectId } from "mongodb";
import { Plano } from "../../entities/Plano";

export interface IPlanoUpdateOnlyRepository {
    updateAsync(id: ObjectId, plano: Plano): Promise<void>
}