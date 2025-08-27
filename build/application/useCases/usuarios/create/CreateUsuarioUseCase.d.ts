import { RequestCreateUsuarioJson } from '../../../../shared/communication/requests/usuarios/RequestCreateUsuarioJson';
import { ICreateUsuarioUseCase } from './ICreateUsuarioUseCase';
import { ResponseUsuarioJson } from '../../../../shared/communication/responses/usuarios/ResponseUsuarioJson';
import { PasswordEncrypt } from '../../../servicos/PasswordEncrypt';
import type { IUsuarioWriteOnlyRepository } from '../../../../domain/repositories/usuarios/IUsuarioWriteOnlyRepository';
import type { IUsuarioReadOnlyRepository } from '../../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository';
import { TokenController } from '../../../../api/controllers/TokenController';
export declare class CreateUsuarioUseCase implements ICreateUsuarioUseCase {
    private readonly usuarioRepository;
    private readonly usuarioReadRepository;
    private readonly tokenController;
    private readonly passwordEncrypt;
    constructor(usuarioRepository: IUsuarioWriteOnlyRepository, usuarioReadRepository: IUsuarioReadOnlyRepository, tokenController: TokenController, passwordEncrypt: PasswordEncrypt);
    execute(request: RequestCreateUsuarioJson): Promise<ResponseUsuarioJson>;
    private validateRequest;
}
//# sourceMappingURL=CreateUsuarioUseCase.d.ts.map