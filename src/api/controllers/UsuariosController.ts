import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestCreateUsuarioJson } from '../../shared/communication/requests/usuarios/RequestCreateUsuarioJson';
import { ResponseUsuarioJson } from '../../shared/communication/responses/usuarios/ResponseUsuarioJson';
import { ICreateUsuarioUseCase } from '../../application/useCases/usuarios/create/ICreateUsuarioUseCase';
import { IGetAllUsuarioUseCase } from '../../application/useCases/usuarios/getAll/IGetAllUsuarioUseCase';
import { container } from 'tsyringe';
import { zeusAuthorize } from '../middlewares/ZeusAuthorize';

const usuariosRouter = Router();

usuariosRouter.post('/', async (req: Request<{}, {}, RequestCreateUsuarioJson>, res: Response<ResponseUsuarioJson>) => {
    const result = await container.resolve<ICreateUsuarioUseCase>("ICreateUsuarioUseCase").execute(req.body);
    return res.status(StatusCodes.CREATED).json(result);
});

usuariosRouter.get('/', zeusAuthorize(), async (_req, res: Response<ResponseUsuarioJson[]>) => {
    const result = await container.resolve<IGetAllUsuarioUseCase>("IGetAllUsuarioUseCase").execute();
    return res.status(StatusCodes.OK).json(result);
});

export default usuariosRouter;