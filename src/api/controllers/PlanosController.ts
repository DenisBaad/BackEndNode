import { Request, Response, Router } from "express";
import { RequestPlanoJson } from "../../shared/communication/requests/planos/RequestPlanoJson";
import { ResponsePlanoJson } from "../../shared/communication/responses/planos/ResponsePlanoJson";
import { container } from "tsyringe";
import { ICreatePlanoUseCase } from '../../application/useCases/planos/create/ICreatePlanoUseCase';
import { StatusCodes } from "http-status-codes";
import { IGetAllPlanoUseCase } from "../../application/useCases/planos/getall/IGetAllPlanoUseCase";
import { IEditPlanoUseCase } from "../../application/useCases/planos/edit/IEditPlanoUseCase";

const planosRouter = Router();

planosRouter.post('/', async (req: Request<{}, {}, RequestPlanoJson>, res: Response<ResponsePlanoJson>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<ICreatePlanoUseCase>("ICreatePlanoUseCase").execute(usuarioId, req.body);
    return res.status(StatusCodes.CREATED).json(result);
});

planosRouter.get('/', async (req, res: Response<ResponsePlanoJson[]>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<IGetAllPlanoUseCase>("IGetAllPlanoUseCase").execute(usuarioId);
    return res.status(StatusCodes.OK).json(result);
})

planosRouter.put('/:id', async (req: Request<{id: string}, {}, RequestPlanoJson>, res: Response<null>) => {
    await container.resolve<IEditPlanoUseCase>("IEditPlanoUseCase").execute(req.params.id, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
})

export default planosRouter;

