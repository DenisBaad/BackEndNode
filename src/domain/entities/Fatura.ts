import { Entity, Column } from 'typeorm';
import { BaseEntity } from "./BaseEntity";
import { EnumStatusFatura } from '../../shared/communication/enums/EnumStatusFatura';

@Entity()
export class Fatura extends BaseEntity {
  @Column() status!: EnumStatusFatura;
  @Column() inicioVigencia!: Date;
  @Column() fimVigencia!: Date;
  @Column() dataPagamento?: Date;
  @Column() dataVencimento!: Date;
  @Column() valorTotal!: number;
  @Column() valorPagamento?: number;
  @Column() valorDesconto?: number;
  @Column() usuarioId!: string;
  @Column() planoId!: string;
  @Column() clienteId!: string;
}