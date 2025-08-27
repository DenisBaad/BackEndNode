import { Router } from 'express';
import { zeusAuthorize } from '../middlewares/ZeusAuthorize';
import usuariosRouter from './../controllers/UsuariosController';
import loginRouter from './../controllers/LoginController';
import planosRouter from '../controllers/PlanosController';
import clientesRouter from '../controllers/ClientesController';
import faturasRouter from '../controllers/FaturasController';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use('/login', loginRouter);
router.use('/planos', zeusAuthorize(), planosRouter);
router.use('/clientes', zeusAuthorize(), clientesRouter);
router.use('/faturas', zeusAuthorize(), faturasRouter);

export default router;

export { router }

