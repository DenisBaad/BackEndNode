import { ObjectId } from "mongodb";
import { Plano } from "../../domain/entities/Plano";
import { IPlanoReadOnlyRepository } from "../../domain/repositories/planos/IPlanoReadOnlyRepository";
import { IPlanoUpdateOnlyRepository } from "../../domain/repositories/planos/IPlanoUpdateOnlyRepository";
import { IPlanoWriteOnlyRepository } from "../../domain/repositories/planos/IPlanoWriteOnlyRepository";
import { ResponsePlanoJson } from "../../shared/communication/responses/planos/ResponsePlanoJson";
import { ZeusContext } from "../database/ZeusContext";
import { PagedResult } from "../../shared/communication/responses/PagedResult";

export class PlanoRepository implements IPlanoWriteOnlyRepository, IPlanoReadOnlyRepository, IPlanoUpdateOnlyRepository {
    private readonly _context = ZeusContext.getMongoRepository(Plano);

    async addAsync(plano: Plano): Promise<void> {
        await this._context.save(plano);
    }

    async getAllAsync(usuarioId: string, pageNumber: number, pageSize: number, search?: string): Promise<PagedResult<ResponsePlanoJson>> {
        const where: any = { usuarioId };

        if (search && search.trim() !== "") {
          where.descricao = { $regex: search, $options: "i" };
        }

        const totalCount = await this._context.countDocuments(where);
        const items = await this._context.find({
          where,
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
      });

      return new PagedResult<ResponsePlanoJson>(items, totalCount);
    }


    async getByIdAsync(_id: ObjectId): Promise<Plano | null> {
        return await this._context.findOne({where: {_id}})
    }

    async updateAsync(_id: ObjectId, plano: Plano): Promise<void> {
        await this._context.update({_id}, plano)
    }
}