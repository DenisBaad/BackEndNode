import * as yup from 'yup';
import { RequestPlanoJson } from '../../../shared/communication/requests/planos/RequestPlanoJson';

export const planoValidator: yup.Schema<RequestPlanoJson> = yup.object().shape({
    descricao: yup.string()
        .required("A descrição é obrigatória"),
    
    valorPlano: yup.number()
        .required("O valor do plano deve ser informado"),

    quantidadeUsuarios: yup.number()
        .required("A quantidade de usuários deve ser informada"),

    vigenciaMeses: yup.number()
        .required("È necessário passar o período da vigência")
});