import { Request, Response, Router } from "express";
import { RequestLoginJson } from "../../shared/communication/requests/login/RequestLoginJson";
import { ResponseLoginJson } from "../../shared/communication/responses/login/ResponseLoginJson";
import { ILoginUseCase } from "../../application/useCases/login/ILoginUseCase";
import { StatusCodes } from 'http-status-codes';
import { container } from "tsyringe";

const loginRouter = Router();

loginRouter.post('/', async (req: Request<{}, {}, RequestLoginJson>, res: Response<ResponseLoginJson>) => {
    const result = await container.resolve<ILoginUseCase>("ILoginUseCase").execute(req.body);
    return res.status(StatusCodes.OK).json(result);
});

export default loginRouter;