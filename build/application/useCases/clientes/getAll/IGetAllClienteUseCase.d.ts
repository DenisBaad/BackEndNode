import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
export interface IGetAllClienteUseCase {
    execute(usuarioId: string): Promise<ResponseClienteJson[]>;
}
//# sourceMappingURL=IGetAllClienteUseCase.d.ts.map