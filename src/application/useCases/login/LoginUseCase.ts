import { inject, injectable } from "tsyringe";
import { RequestLoginJson } from "../../../shared/communication/requests/login/RequestLoginJson";
import { ResponseLoginJson } from "../../../shared/communication/responses/login/ResponseLoginJson";
import { ILoginUseCase } from "./ILoginUseCase";
import { TokenController } from "../../../api/controllers/TokenController";
import { PasswordEncrypt } from "../../servicos/PasswordEncrypt";
import { InvalidLoginException } from "../../../shared/exception/InvalidLoginException";
import type { IUsuarioReadOnlyRepository } from "../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository";

@injectable()
export class LoginUseCase implements ILoginUseCase {

  constructor(
    @inject("IUsuarioReadOnlyRepository") private readonly usuarioRepository: IUsuarioReadOnlyRepository,
    @inject("TokenController") private readonly tokenController: TokenController,
    private readonly passwordEncrypt: PasswordEncrypt) {}

  async execute(request: RequestLoginJson): Promise<ResponseLoginJson> {
    try {
      const senhaCriptografada = this.passwordEncrypt.encript(request.senha);
      const usuario = await this.usuarioRepository.existUserByEmailAndPasswordAsync(request.email, senhaCriptografada);

      if (!usuario) {
        throw new InvalidLoginException();
      }

      const token = this.tokenController.create(usuario._id.toString());

      return {
        nome: usuario.nome,
        token,
      };

    } catch (error) {
      if (!(error instanceof InvalidLoginException)) {
        throw new InvalidLoginException("E-mail ou senha inválidos.");
      }
      throw error;
    }
  }
}
