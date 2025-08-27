import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";

export interface IGetAllPlanoUseCase {
    execute(usuarioId: string): Promise<ResponsePlanoJson[]>
}