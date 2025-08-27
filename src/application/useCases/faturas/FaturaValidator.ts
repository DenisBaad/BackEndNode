import * as yup from 'yup';
import { RequestFaturaJson } from '../../../shared/communication/requests/faturas/RequestFaturaJson';

export const faturaValidator: yup.Schema<RequestFaturaJson> = yup.object().shape({
  status: yup.mixed<RequestFaturaJson['status']>()
    .required('Status deve ser informado'),

  inicioVigencia: yup.date()
    .required('Início da vigência é obrigatório'),

  fimVigencia: yup.date()
    .required('Fim da vigência é obrigatório'),

  valorTotal: yup.number()
    .min(0, 'Valor total não pode ser negativo')
    .required('Valor total é obrigatório'),

  dataVencimento: yup.date()
    .min(new Date(), 'Data de vencimento deve ser hoje ou futura')
    .required('Data de vencimento é obrigatória'),

  planoId: yup.string()
    .required('PlanoId deve ser informado'),

  clienteId: yup.string()
    .required('ClienteId deve ser informado'),
})