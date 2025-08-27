import { EnumStatusFatura } from "../../enums/EnumStatusFatura";
export interface RequestFaturaJson {
    status: EnumStatusFatura;
    inicioVigencia: Date;
    fimVigencia: Date;
    dataPagamento?: Date;
    dataVencimento: Date;
    valorTotal: number;
    valorPagamento?: number;
    valorDesconto?: number;
    planoId: string;
    clienteId: string;
}
//# sourceMappingURL=RequestFaturaJson.d.ts.map