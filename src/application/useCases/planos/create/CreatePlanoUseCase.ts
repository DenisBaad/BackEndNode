import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";
import { ResponsePlanoJson } from "../../../../shared/communication/responses/planos/ResponsePlanoJson";
import { planoValidator } from "../planoValidator";
import { ICreatePlanoUseCase } from "./ICreatePlanoUseCase";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";
import { ValidationError } from "yup";
import { Plano } from "../../../../domain/entities/Plano";
import { inject, injectable } from "tsyringe";
import type { IPlanoWriteOnlyRepository } from '../../../../domain/repositories/planos/IPlanoWriteOnlyRepository';

@injectable()
export class CreatePlanoUseCase implements ICreatePlanoUseCase {

  constructor(@inject("IPlanoWriteOnlyRepository") private readonly planoRepository: IPlanoWriteOnlyRepository) {}
    
  async execute(usuarioId: string, request: RequestPlanoJson): Promise<ResponsePlanoJson> {
    await this.validate(request);

    const plano = new Plano();
    plano.usuarioId = usuarioId,
    plano.descricao = request.descricao;
    plano.valorPlano = request.valorPlano;
    plano.quantidadeUsuarios = request.quantidadeUsuarios;
    plano.vigenciaMeses = request.vigenciaMeses;

    await this.planoRepository.addAsync(plano);

    return {
        descricao: plano.descricao,
        valorPlano: plano.valorPlano,
        quantidadeUsuarios: plano.quantidadeUsuarios,
        vigenciaMeses: plano.vigenciaMeses,
        usuarioId: plano.usuarioId
    }
  }

  private async validate(request: RequestPlanoJson): Promise<void> {
    try {
      await planoValidator.validate(request, { abortEarly: false });
    } catch (err) {
        if (err instanceof ValidationError) {
      throw new ValidationErrorException(err.errors);
      }
      throw err;
    }
  }
}