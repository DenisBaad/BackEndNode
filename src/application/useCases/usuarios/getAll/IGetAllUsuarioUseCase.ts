import { ResponseUsuarioJson } from "../../../../shared/communication/responses/usuarios/ResponseUsuarioJson";

export interface IGetAllUsuarioUseCase {
  execute(): Promise<ResponseUsuarioJson[]>; 
}