import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";
import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
export interface ICreateFaturaUseCase {
    execute(usuarioId: string, request: RequestFaturaJson): Promise<ResponseFaturaJson>;
}
//# sourceMappingURL=ICreateFaturaUseCase.d.ts.map