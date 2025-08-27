import * as yup from 'yup';
import { RequestCreateUsuarioJson } from '../../../shared/communication/requests/usuarios/RequestCreateUsuarioJson';

export const requestValidation: yup.Schema<RequestCreateUsuarioJson> = yup.object().shape({
  nome: yup.string()
    .required('O nome é obrigatório'),  
  
  email: yup.string()
    .required('O email é obrigatório')
    .email('Informe um email válido'),

  senha: yup.string()
  .required('A senha é obrigatória')
  .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

