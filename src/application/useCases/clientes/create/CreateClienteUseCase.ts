import { ValidationError } from "yup";
import { RequestClienteJson } from "../../../../shared/communication/requests/clientes/RequestClienteJson";
import { ResponseClienteJson } from "../../../../shared/communication/responses/clientes/ResponseClienteJson";
import { clienteValidator } from "../clienteValidator";
import { ICreateClienteUseCase } from "./ICreateClienteUseCase";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";
import { inject, injectable } from "tsyringe";
import type { IClienteWriteOnlyRepository } from "../../../../domain/repositories/clientes/IClienteWriteOnlyRepository";
import { Cliente } from "../../../../domain/entities/Cliente";

@injectable()
export class CreateClienteUseCase implements ICreateClienteUseCase {

    constructor(@inject("IClienteWriteOnlyRepository") private readonly clienteRepository: IClienteWriteOnlyRepository) {}

    async execute(usuarioId: string, request: RequestClienteJson): Promise<ResponseClienteJson> {
        await this.validate(request);

        const cliente = new Cliente();
        cliente.usuarioId = usuarioId,
        cliente.codigo = request.codigo,
        cliente.contato = request.contato,
        cliente.cpfCnpj = request.cpfCnpj,
        cliente.dataNascimento = new Date(request.dataNascimento),
        cliente.identidade = request.identidade
        cliente.nome = request.nome,
        cliente.nomeFantasia = request.nomeFantasia,
        cliente.orgaoExpedidor = request.orgaoExpedidor,
        cliente.status = request.status,
        cliente.tipo = request.tipo

        await this.clienteRepository.addAsync(cliente);

        return {
            codigo: cliente.codigo,
            contato: cliente.contato,
            cpfCnpj: cliente.cpfCnpj,
            dataNascimento: cliente.dataNascimento,
            identidade: cliente.identidade,
            nome: cliente.nome,
            nomeFantasia: cliente.nomeFantasia,
            orgaoExpedidor: cliente.orgaoExpedidor,
            status: cliente.status,
            tipo: cliente.tipo
        };
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
