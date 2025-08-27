"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCPF = isValidCPF;
function isValidCPF(cpf) {
    cpf = cpf.replace(/[.\-]/g, '').trim();
    if (cpf.length !== 11)
        return false;
    let soma = 0;
    let resto;
    const multiplicador1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let tempCpf = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
        soma += parseInt(tempCpf.charAt(i)) * multiplicador1[i];
    }
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
    let digito = resto.toString();
    tempCpf += digito;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(tempCpf.charAt(i)) * multiplicador2[i];
    }
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
    digito += resto.toString();
    return cpf.endsWith(digito);
}
//# sourceMappingURL=ValidaCPF.js.map