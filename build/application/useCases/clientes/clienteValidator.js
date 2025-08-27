"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteValidator = void 0;
const yup = __importStar(require("yup"));
const ValidaCPF_1 = require("../../servicos/helpers/ValidaCPF");
const ValidaCNPJ_1 = require("../../servicos/helpers/ValidaCNPJ");
exports.clienteValidator = yup.object({
    cpfCnpj: yup.string()
        .required()
        .test('length-check', 'Cpf/Cnpj deve ter entre 11 e 14 caracteres', value => {
        if (!value)
            return true;
        return value.length >= 11 && value.length <= 14;
    })
        .test('cpf-cnpj-valid', 'Cpf/Cnpj inválido', value => {
        if (!value)
            return true;
        if (value.length === 11)
            return (0, ValidaCPF_1.isValidCPF)(value);
        if (value.length === 14)
            return (0, ValidaCNPJ_1.isValidCNPJ)(value);
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
    identidade: yup.string()
        .notRequired()
        .test('only-numbers-spaces', 'Identidade contém caracteres inválidos', value => {
        if (!value)
            return true;
        return /^[0-9\s]+$/.test(value);
    })
        .min(6, 'Identidade deve ter no mínimo 6 caracteres')
        .max(20, 'Identidade deve ter no máximo 20 caracteres'),
    orgaoExpedidor: yup.string()
        .when('identidade', {
        is: (val) => !!val && val.length > 0,
        then: schema => schema
            .required('Órgão Expedidor é obrigatório')
            .test('alphanumeric', 'Órgão Expedidor contém caracteres inválidos', value => {
            if (!value)
                return false;
            return /^[a-zA-Z0-9\s]+$/.test(value);
        })
            .min(1, 'Órgão Expedidor deve ter no mínimo 1 caractere')
            .max(10, 'Órgão Expedidor deve ter no máximo 10 caracteres'),
        otherwise: schema => schema.notRequired()
    }),
    tipo: yup.mixed()
        .required('Tipo deve ser informado'),
    status: yup.mixed()
        .required('Status deve ser informado'),
    nomeFantasia: yup.string()
        .notRequired()
        .test('alphanumeric-spaces', 'Nome Fantasia contém caracteres inválidos', value => {
        if (!value)
            return true;
        return /^[a-zA-Z0-9\s]+$/.test(value);
    })
        .min(1, 'Nome Fantasia deve ter no mínimo 1 caractere')
        .max(45, 'Nome Fantasia deve ter no máximo 45 caracteres'),
    dataNascimento: yup.date()
        .required('Data de nascimento é obrigatória'),
});
//# sourceMappingURL=clienteValidator.js.map