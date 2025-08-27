import { inject, injectable } from "tsyringe";
import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";
import { ResponseFaturaJson } from "../../../../shared/communication/responses/faturas/ResponseFaturaJson";
import { ICreateFaturaUseCase } from "./ICreateFaturaUseCase";
import type { IFaturaWriteOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaWriteOnlyRepository";
import { faturaValidator } from "../FaturaValidator";
import { ValidationError } from "yup";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";
import { Fatura } from "../../../../domain/entities/Fatura";

@injectable()
export class CreateFaturaUseCase implements ICreateFaturaUseCase {

    constructor(@inject("IFaturaWriteOnlyRepository") private readonly faturaRepository: IFaturaWriteOnlyRepository) {}

    async execute(usuarioId: string, request: RequestFaturaJson): Promise<ResponseFaturaJson> {
        await this.validate(request)

        const fatura = new Fatura();
        fatura.usuarioId = usuarioId,
        fatura.planoId = request.planoId,
        fatura.clienteId = request.clienteId,
        fatura.status = request.status,
        fatura.inicioVigencia = new Date(request.inicioVigencia),
        fatura.fimVigencia = new Date(request.fimVigencia),      
        fatura.dataPagamento = request.dataPagamento ? new Date(request.dataPagamento) : undefined;
        fatura.dataVencimento = new Date(request.dataVencimento),
        fatura.valorPagamento = request.valorPagamento,
        fatura.valorDesconto = request.valorPagamento,
        fatura.valorTotal = request.valorTotal

        await this.faturaRepository.addAsync(fatura);

        return {
            usuarioId: fatura.usuarioId,
            planoId: fatura.planoId,
            clienteId: fatura.clienteId,
            status: fatura.status,
            inicioVigencia: fatura.inicioVigencia,
            fimVigencia: fatura.fimVigencia,
            dataPagamento: fatura.dataPagamento,
            dataVencimento: fatura.dataVencimento,
            valorPagamento: fatura.valorPagamento,
            valorDesconto: fatura.valorDesconto,
            valorTotal: fatura.valorTotal
        };
    }

    private async validate(request: RequestFaturaJson): Promise<void> {
        try {
      await faturaValidator.validate(request, { abortEarly: false });
    } catch (err) {
        if (err instanceof ValidationError) {
      throw new ValidationErrorException(err.errors);
      }
      throw err;
    }
  }
}