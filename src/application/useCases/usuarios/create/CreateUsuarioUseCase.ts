import { RequestCreateUsuarioJson } from '../../../../shared/communication/requests/usuarios/RequestCreateUsuarioJson';
import { requestValidation } from './../usuarioValidator'; 
import { ICreateUsuarioUseCase } from './ICreateUsuarioUseCase';
import { ResponseUsuarioJson } from '../../../../shared/communication/responses/usuarios/ResponseUsuarioJson';
import { ValidationError } from 'yup';
import { ValidationErrorException } from '../../../../shared/exception/ValidationErrorException';
import { Usuario } from '../../../../domain/entities/Usuario';
import { injectable, inject } from "tsyringe";
import { PasswordEncrypt } from '../../../servicos/PasswordEncrypt';
import type { IUsuarioWriteOnlyRepository } from '../../../../domain/repositories/usuarios/IUsuarioWriteOnlyRepository';
import type { IUsuarioReadOnlyRepository } from '../../../../domain/repositories/usuarios/IUsuarioReadOnlyRepository';
import { TokenController } from '../../../../api/controllers/TokenController';

@injectable()
export class CreateUsuarioUseCase implements ICreateUsuarioUseCase {

  constructor(
    @inject("IUsuarioWriteOnlyRepository") private readonly usuarioRepository: IUsuarioWriteOnlyRepository,
    @inject("IUsuarioReadOnlyRepository") private readonly usuarioReadRepository: IUsuarioReadOnlyRepository,
    @inject("TokenController") private readonly tokenController: TokenController,
    private readonly passwordEncrypt: PasswordEncrypt) {}
  
  async execute(request: RequestCreateUsuarioJson): Promise<ResponseUsuarioJson> {
    await this.validateRequest(request);

    const usuario = new Usuario();
    usuario.nome = request.nome;
    usuario.email = request.email;
    usuario.senha = this.passwordEncrypt.encript(request.senha);

    const result = await this.usuarioRepository.addAsync(usuario);

    return {
      nome: usuario.nome,
      token: this.tokenController.create(result.toString()),
    };
  }

  private async validateRequest(request: RequestCreateUsuarioJson): Promise<void> {
    let errors: string[] = [];
  
    try {
      await requestValidation.validate(request, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        errors = errors.concat(err.errors);
      } else {
        throw err; 
      }
    }
  
    const emailExist = await this.usuarioReadRepository.existUseWithEmailAsync(request.email);
  
    if (emailExist) {
      errors.push("Email já cadastrado na base de dados"); 
    }
  
    if (errors.length > 0) {
      throw new ValidationErrorException(errors);
    }
  }
}