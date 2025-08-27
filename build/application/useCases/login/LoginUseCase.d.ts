import { RequestLoginJson } from "../../../shared/communication/requests/login/RequestLoginJson";
import { ResponseLoginJson } from "../../../shared/communication/responses/login/ResponseLoginJson";
import { ILoginUseCase } from "./ILoginUseCase";
import { TokenController } from "../../../api/controllers/TokenController";
import { PasswordEncrypt } from "../../servicos/PasswordEncrypt";
import type { IUsuarioReadOnlyRepository } from "../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository";
export declare class LoginUseCase implements ILoginUseCase {
    private readonly usuarioRepository;
    private readonly tokenController;
    private readonly passwordEncrypt;
    constructor(usuarioRepository: IUsuarioReadOnlyRepository, tokenController: TokenController, passwordEncrypt: PasswordEncrypt);
    execute(request: RequestLoginJson): Promise<ResponseLoginJson>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map