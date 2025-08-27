import { Request, Response, Router } from "express";
import { RequestFaturaJson } from "../../shared/communication/requests/faturas/RequestFaturaJson";
import { ResponseFaturaJson } from "../../shared/communication/responses/faturas/ResponseFaturaJson";
import { container } from "tsyringe";
import { ICreateFaturaUseCase } from "../../application/useCases/faturas/create/ICreateFaturaUseCase";
import { StatusCodes } from "http-status-codes";
import { GetAllFaturaUseCase } from "../../application/useCases/faturas/getAll/GetAllFaturaUseCase";
import { IEditFaturaUseCase } from "../../application/useCases/faturas/edit/IEditFaturaUseCase";
import { IRelatorioFaturasUseCase } from "../../application/useCases/relatorios/relatorioFaturas/IRelatorioFaturasUseCase";
import { EnumStatusFatura } from "../../shared/communication/enums/EnumStatusFatura";

const faturasRouter = Router();

faturasRouter.post('/', async (req: Request<{}, {}, RequestFaturaJson>, res: Response<ResponseFaturaJson>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<ICreateFaturaUseCase>("ICreateFaturaUseCase").execute(usuarioId, req.body)
    return res.status(StatusCodes.CREATED).json(result);
})

faturasRouter.get('/', async (req, res: Response<ResponseFaturaJson[]>) => {
    const usuarioId = (req as any).userId;
    const result = await container.resolve<GetAllFaturaUseCase>("IGetAllFaturaUseCase").execute(usuarioId);
    return res.status(StatusCodes.OK).json(result);
})

faturasRouter.put('/:id', async (req: Request<{id: string}, {}, RequestFaturaJson>, res: Response<null>) => {
    await container.resolve<IEditFaturaUseCase>("IEditFaturaUseCase").execute(req.params.id, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
})

faturasRouter.get('/gerar-relatorio-faturas-clientes', async (req: Request, res: Response) => {
    const usuarioId = (req as any).userId;
    const usuarioNome = req.query.usuarioNome as string;
    const dataAbertura = req.query.dataAbertura ? new Date(req.query.dataAbertura as string) : undefined;
    const dataFechamento = req.query.dataFechamento ? new Date(req.query.dataFechamento as string) : undefined;
    const status = req.query.status !== undefined ? Number(req.query.status) as EnumStatusFatura : undefined;
    const clienteIds = [req.query.clienteId].flat().filter(Boolean) as string[];
    const result = await container.resolve<IRelatorioFaturasUseCase>("IRelatorioFaturasUseCase").executar(usuarioId, usuarioNome, dataAbertura, dataFechamento, status, clienteIds);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=relatorio_faturas.pdf");
    return res.status(StatusCodes.OK).send(result);
});

export default faturasRouter;