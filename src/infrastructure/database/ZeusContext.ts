import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../../domain/entities/Usuario";
import { Plano } from "../../domain/entities/Plano";
import { Cliente } from "../../domain/entities/Cliente";
import { Fatura } from "../../domain/entities/Fatura";

export const ZeusContext = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URL!,
  synchronize: true, 
  logging: true,
  entities: [Usuario, Plano, Cliente, Fatura],
});