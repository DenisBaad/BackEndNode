"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCNPJ = isValidCNPJ;
function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[.\-\/]/g, '').trim();
    if (cnpj.length !== 14)
        return false;
    const multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    let resto;
    let tempCnpj = cnpj.substring(0, 12);
    for (let i = 0; i < 12; i++) {
        soma += parseInt(tempCnpj.charAt(i)) * multiplicador1[i];
    }
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
    let digito = resto.toString();
    tempCnpj += digito;
    soma = 0;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(tempCnpj.charAt(i)) * multiplicador2[i];
    }
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
    digito += resto.toString();
    return cnpj.endsWith(digito);
}
//# sourceMappingURL=ValidaCNPJ.js.map