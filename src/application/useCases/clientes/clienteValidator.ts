import * as yup from 'yup';
import { RequestClienteJson } from '../../../shared/communication/requests/clientes/RequestClienteJson';
import { isValidCPF } from '../../servicos/helpers/ValidaCPF';
import { isValidCNPJ } from '../../servicos/helpers/ValidaCNPJ';

export const clienteValidator = yup.object({
  cpfCnpj: yup.string()
    .required()
    .test('length-check', 'Cpf/Cnpj deve ter entre 11 e 14 caracteres', value => {
      if (!value) return true;
      return value.length >= 11 && value.length <= 14;
    })
    .test('cpf-cnpj-valid', 'Cpf/Cnpj inválido', value => {
      if (!value) return true;
      if (value.length === 11) return isValidCPF(value);
      if (value.length === 14) return isValidCNPJ(value);
      return false;
    }),

  nome: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(45, 'Nome deve ter no máximo 45 caracteres'),

  contato: yup.string()
    .required('Contato é obrigatório'),

  codigo: yup.number()
    .required('Codigo é obrigatório'),

  orgaoExpedidor: yup.string()
    .when('identidade', {
      is: (val: string | undefined) => !!val && val.length > 0,
      then: schema => schema
        .required('Órgão Expedidor é obrigatório')
        .test('alphanumeric', 'Órgão Expedidor contém caracteres inválidos', value => {
          if (!value) return false;
          return /^[a-zA-Z0-9\s]+$/.test(value);
        })
        .min(1, 'Órgão Expedidor deve ter no mínimo 1 caractere')
        .max(10, 'Órgão Expedidor deve ter no máximo 10 caracteres'),
      otherwise: schema => schema.notRequired()
    }),

  tipo: yup.mixed<RequestClienteJson['tipo']>()
    .required('Tipo deve ser informado'),

  status: yup.mixed<RequestClienteJson['status']>()
    .required('Status deve ser informado'),

  dataNascimento: yup.date()
    .required('Data de nascimento é obrigatória'),

}) as yup.Schema<RequestClienteJson>;