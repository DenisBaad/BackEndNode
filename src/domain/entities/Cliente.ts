import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { EnumStatusCliente } from "../../shared/communication/enums/EnumStatusCliente";
import { EnumTipoCliente } from "../../shared/communication/enums/EnumTipoCliente";

@Entity()
export class Cliente extends BaseEntity {
  @Column() codigo!: number;
  @Column() cpfCnpj!: string;
  @Column() nome!: string;
  @Column() identidade?: string;
  @Column() orgaoExpedidor?: string;
  @Column() dataNascimento!: Date;
  @Column() nomeFantasia?: string;
  @Column() contato!: string;
  @Column() status!: EnumStatusCliente;
  @Column() tipo!: EnumTipoCliente;
  @Column() usuarioId!: string;
}