import { EnumStatusCliente } from "../../enums/EnumStatusCliente";
import { EnumTipoCliente } from "../../enums/EnumTipoCliente";
export interface ResponseClienteJson {
    id?: string;
    codigo: number;
    tipo: EnumTipoCliente;
    cpfCnpj: string;
    status: EnumStatusCliente;
    nome: string;
    identidade?: string;
    orgaoExpedidor?: string;
    dataNascimento?: Date;
    nomeFantasia?: string;
    contato: string;
}
//# sourceMappingURL=ResponseClienteJson.d.ts.map