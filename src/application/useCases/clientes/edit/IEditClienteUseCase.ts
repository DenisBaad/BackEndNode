import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";

export interface IEditClienteUseCase {
    execute(id: string, request: RequestClienteJson): Promise<void>
}