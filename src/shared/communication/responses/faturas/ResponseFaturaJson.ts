import { EnumStatusFatura } from "../../enums/EnumStatusFatura";

export interface ResponseFaturaJson {
    id?: string;
    status: EnumStatusFatura;
    inicioVigencia: Date;
    fimVigencia: Date;
    dataPagamento?: Date;
    dataVencimento: Date;
    valorTotal: number;
    valorPagamento?: number;
    valorDesconto?: number;
    usuarioId: string;
    planoId: string;
    clienteId: string;
}