"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fatura = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const EnumStatusFatura_1 = require("../../shared/communication/enums/EnumStatusFatura");
let Fatura = class Fatura extends BaseEntity_1.BaseEntity {
    status;
    inicioVigencia;
    fimVigencia;
    dataPagamento;
    dataVencimento;
    valorTotal;
    valorPagamento;
    valorDesconto;
    usuarioId;
    planoId;
    clienteId;
};
exports.Fatura = Fatura;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fatura.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Fatura.prototype, "inicioVigencia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Fatura.prototype, "fimVigencia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Fatura.prototype, "dataPagamento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Fatura.prototype, "dataVencimento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fatura.prototype, "valorTotal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fatura.prototype, "valorPagamento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fatura.prototype, "valorDesconto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fatura.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fatura.prototype, "planoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fatura.prototype, "clienteId", void 0);
exports.Fatura = Fatura = __decorate([
    (0, typeorm_1.Entity)()
], Fatura);
//# sourceMappingURL=Fatura.js.map