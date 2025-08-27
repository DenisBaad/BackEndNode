import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";

export interface IEditPlanoUseCase {
    execute(id: string, request: RequestPlanoJson): Promise<void>
}