import { RequestLoginJson } from "../../../shared/communication/requests/login/RequestLoginJson";
import { ResponseLoginJson } from "../../../shared/communication/responses/login/ResponseLoginJson";

export interface ILoginUseCase {
    execute(request: RequestLoginJson): Promise<ResponseLoginJson>
}