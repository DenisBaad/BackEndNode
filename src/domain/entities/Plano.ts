import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Plano extends BaseEntity {
  @Column() descricao!: string;
  @Column() valorPlano!: number;
  @Column() quantidadeUsuarios!: number;
  @Column() vigenciaMeses!: number;
  @Column() usuarioId!: string;
}