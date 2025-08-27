import { EnumStatusFatura } from "../../../../shared/communication/enums/EnumStatusFatura";

export interface IRelatorioFaturasUseCase {
    executar(usuarioId: string, usuarioNome: string, dataAbertura?: Date, dataFechamento?: Date,status?: EnumStatusFatura, clienteIds?: string[]): Promise<Buffer> 
}