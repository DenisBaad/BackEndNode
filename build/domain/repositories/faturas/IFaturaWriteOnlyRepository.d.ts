import { Fatura } from "../../entities/Fatura";
export interface IFaturaWriteOnlyRepository {
    addAsync(fatura: Fatura): Promise<void>;
}
//# sourceMappingURL=IFaturaWriteOnlyRepository.d.ts.map