import { Request, Response, Router } from "express";
import { RequestClienteJson } from "../../shared/communication/requests/clientes/RequestClienteJson";
import { ResponseClienteJson } from "../../shared/communication/responses/clientes/ResponseClienteJson";
import { container } from "tsyringe";
import { ICreateClienteUseCase } from "../../application/useCases/clientes/create/ICreateClienteUseCase";
import { StatusCodes } from "http-status-codes";
import { GetAllClienteUseCase } from "../../application/useCases/clientes/getAll/GetAllClienteUseCase";
import { IEditClienteUseCase } from "../../application/useCases/clientes/edit/IEditClienteUseCase";
import { IAtivarInativarUseCase } from "../../application/useCases/clientes/AtivarInativar/IAtivarInativarUseCase";

const clientesRouter = Router();

clientesRouter.post('/', async (req: Request<{}, {}, RequestClienteJson>, res: Response<ResponseClienteJson>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<ICreateClienteUseCase>("ICreateClienteUseCase").execute(usuarioId, req.body)
    return res.status(StatusCodes.CREATED).json(result);
})

clientesRouter.get('/', async (req, res: Response<ResponseClienteJson[]>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<GetAllClienteUseCase>("IGetAllClienteUseCase").execute(usuarioId);
    return res.status(StatusCodes.OK).json(result);
})

clientesRouter.put('/:id', async (req: Request<{id: string}, {}, RequestClienteJson>, res: Response<null>) => {
    await container.resolve<IEditClienteUseCase>("IEditClienteUseCase").execute(req.params.id, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
})

clientesRouter.patch('/:id', async (req: Request<{id: string}>, res) => {
    await container.resolve<IAtivarInativarUseCase>("IAtivarInativarUseCase").execute(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).send();
})

export default clientesRouter;