import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";
import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
export interface ICreateClienteUseCase {
    execute(usuarioId: string, request: RequestClienteJson): Promise<ResponseClienteJson>;
}
//# sourceMappingURL=ICreateClienteUseCase.d.ts.map