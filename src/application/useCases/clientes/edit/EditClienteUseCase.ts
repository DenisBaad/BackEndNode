import { inject, injectable } from "tsyringe";
import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";
import { IEditClienteUseCase } from "./IEditClienteUseCase";
import type{ IClienteUpdateOnlyRepository } from "../../../../domain/repositories/clientes/IClienteUpdateOnlyRepository";
import type { IClienteReadOnlyRepository } from "../../../../domain/repositories/clientes/IClienteReadOnlyRepository";
import { clienteValidator } from "../clienteValidator";
import { ValidationError } from "yup";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";
import { ObjectId } from "mongodb";

@injectable()
export class EditClienteUseCase implements IEditClienteUseCase {

    constructor(
        @inject("IClienteUpdateOnlyRepository") private readonly clienteUpdateRepository: IClienteUpdateOnlyRepository,
        @inject("IClienteReadOnlyRepository") private readonly clienteReadRepository: IClienteReadOnlyRepository) {}

    async execute(id: string, request: RequestClienteJson): Promise<void> {
        const objectId = new ObjectId(id);
        await this.validate(request);

        var cliente = await this.clienteReadRepository.getByIdAsync(objectId);
        if (!cliente) throw new Error("Cliente não encontrado");

        cliente.codigo = request.codigo,
        cliente.contato = request.contato,
        cliente.cpfCnpj = request.cpfCnpj,
        cliente.dataNascimento = new Date(request.dataNascimento);
        cliente.identidade = request.identidade
        cliente.nome = request.nome,
        cliente.nomeFantasia = request.nomeFantasia,
        cliente.orgaoExpedidor = request.orgaoExpedidor,
        cliente.status = request.status,
        cliente.tipo = request.tipo

        await this.clienteUpdateRepository.updateAsync(objectId, cliente);
    }

    private async validate(request: RequestClienteJson): Promise<void> {
        try {
      await clienteValidator.validate(request, { abortEarly: false });
    } catch (err) {
        if (err instanceof ValidationError) {
      throw new ValidationErrorException(err.errors);
      }
      throw err;
    }
  }
}