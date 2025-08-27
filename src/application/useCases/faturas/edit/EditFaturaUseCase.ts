import { inject, injectable } from "tsyringe";
import type { IFaturaReadOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaReadOnlyRepository";
import type { IFaturaUpdateOnlyRepository } from "../../../../domain/repositories/faturas/IFaturaUpdateOnlyRepository";
import { RequestFaturaJson } from "../../../../shared/communication/requests/faturas/RequestFaturaJson";
import { IEditFaturaUseCase } from "./IEditFaturaUseCase";
import { ObjectId } from "mongodb";
import { faturaValidator } from "../FaturaValidator";
import { ValidationError } from "yup";
import { ValidationErrorException } from "../../../../shared/exception/ValidationErrorException";

@injectable()
export class EditFaturaUseCase implements IEditFaturaUseCase {

    constructor(
        @inject("IFaturaUpdateOnlyRepository") private readonly faturaUpdateRepository: IFaturaUpdateOnlyRepository,
        @inject("IFaturaReadOnlyRepository") private readonly faturaReadRepository: IFaturaReadOnlyRepository) {}

    async execute(id: string, request: RequestFaturaJson): Promise<void> {
        const objectId = new ObjectId(id);
        await this.validate(request);
        
        var fatura = await this.faturaReadRepository.getByIdAsync(objectId);
        if (!fatura) throw new Error("Fatura não encontrado");

        fatura.planoId = request.planoId,
        fatura.clienteId = request.clienteId,
        fatura.status = request.status,
        fatura.inicioVigencia = new Date(request.inicioVigencia);
        fatura.fimVigencia = new Date(request.fimVigencia);
        fatura.dataPagamento = request.dataPagamento ? new Date(request.dataPagamento) : undefined;
        fatura.dataVencimento = new Date(request.dataVencimento);
        fatura.valorPagamento = request.valorPagamento,
        fatura.valorDesconto = request.valorPagamento,
        fatura.valorTotal = request.valorTotal

        await this.faturaUpdateRepository.updateAsync(objectId, fatura);
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