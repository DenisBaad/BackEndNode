import { RequestCreateUsuarioJson } from '../../../../shared/communication/requests/usuarios/RequestCreateUsuarioJson';
import { ResponseUsuarioJson } from '../../../../shared/communication/responses/usuarios/ResponseUsuarioJson';

export interface ICreateUsuarioUseCase {
  execute(request: RequestCreateUsuarioJson): Promise<ResponseUsuarioJson>; 
}