import { Plano } from '../../entities/Plano';

export interface IPlanoWriteOnlyRepository {
    addAsync(plano: Plano): Promise<void>
}