import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Usuario extends BaseEntity {
  @Column() nome!: string;
  @Column() email!: string;
  @Column() senha!: string;
}