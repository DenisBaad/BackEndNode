import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";

export interface IEditFaturaUseCase {
    execute(id: string, request: RequestFaturaJson): Promise<void>
}