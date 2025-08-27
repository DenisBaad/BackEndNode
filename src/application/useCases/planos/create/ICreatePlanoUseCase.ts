import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";
import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";

export interface ICreatePlanoUseCase {
    execute(usuarioId: string, request: RequestPlanoJson): Promise<ResponsePlanoJson>
}