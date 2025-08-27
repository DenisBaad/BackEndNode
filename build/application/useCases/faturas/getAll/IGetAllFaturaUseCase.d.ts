import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
export interface IGetAllFaturaUseCase {
    execute(usuarioId: string): Promise<ResponseFaturaJson[]>;
}
//# sourceMappingURL=IGetAllFaturaUseCase.d.ts.map