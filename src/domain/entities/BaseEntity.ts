import { ObjectId } from "mongodb";
import { ObjectIdColumn, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @ObjectIdColumn() _id!: ObjectId;
  @CreateDateColumn() dataCadastro!: Date;
}