import { ObjectId } from "mongodb";
import { RequestPlanoJson } from "../../../../shared/communication/requests/planos/RequestPlanoJson";
import { IEditPlanoUseCase } from "./IEditPlanoUseCase";
import { inject, injectable } from "tsyringe";
import type { IPlanoUpdateOnlyRepository } from "../../../../domain/repositories/planos/IPlanoUpdateOnlyRepository";
import type { IPlanoReadOnlyRepository } from "../../../../domain/repositories/planos/IPlanoReadOnlyRepository";
import { planoValidator } from "../planoValidator";
import { ValidationError } from "yup";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";

@injectable()
export class EditPlanoUseCase implements IEditPlanoUseCase {

    constructor(
        @inject("IPlanoUpdateOnlyRepository") private readonly planoUpdate: IPlanoUpdateOnlyRepository,
        @inject("IPlanoReadOnlyRepository") private readonly planoRead: IPlanoReadOnlyRepository) {}

    async execute(id: string, request: RequestPlanoJson): Promise<void> {
        const objectId = new ObjectId(id);
        await this.validate(request);

        const plano = await this.planoRead.getByIdAsync(objectId);
        if (!plano) throw new Error("Plano não encontrado");

        plano.descricao = request.descricao
        plano.valorPlano = request.valorPlano
        plano.quantidadeUsuarios = request.quantidadeUsuarios
        plano.vigenciaMeses = request.vigenciaMeses

        await this.planoUpdate.updateAsync(objectId, plano);
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