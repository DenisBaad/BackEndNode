import { BaseEntity } from "./BaseEntity";
import { EnumStatusFatura } from '../../shared/communication/enums/EnumStatusFatura';
export declare class Fatura extends BaseEntity {
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
//# sourceMappingURL=Fatura.d.ts.map