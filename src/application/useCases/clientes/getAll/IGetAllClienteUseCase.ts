import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";

export interface IGetAllClienteUseCase {
    execute(usuarioId: string): Promise<ResponseClienteJson[]>
}