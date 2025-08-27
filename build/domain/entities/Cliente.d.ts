import { BaseEntity } from "./BaseEntity";
import { EnumStatusCliente } from "../../shared/communication/enums/EnumStatusCliente";
import { EnumTipoCliente } from "../../shared/communication/enums/EnumTipoCliente";
export declare class Cliente extends BaseEntity {
    codigo: number;
    cpfCnpj: string;
    nome: string;
    identidade?: string;
    orgaoExpedidor?: string;
    dataNascimento: Date;
    nomeFantasia?: string;
    contato: string;
    status: EnumStatusCliente;
    tipo: EnumTipoCliente;
    usuarioId: string;
}
//# sourceMappingURL=Cliente.d.ts.map