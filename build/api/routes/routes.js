"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ZeusAuthorize_1 = require("../middlewares/ZeusAuthorize");
const UsuariosController_1 = __importDefault(require("./../controllers/UsuariosController"));
const LoginController_1 = __importDefault(require("./../controllers/LoginController"));
const PlanosController_1 = __importDefault(require("../controllers/PlanosController"));
const ClientesController_1 = __importDefault(require("../controllers/ClientesController"));
const FaturasController_1 = __importDefault(require("../controllers/FaturasController"));
const router = (0, express_1.Router)();
exports.router = router;
router.use('/usuarios', UsuariosController_1.default);
router.use('/login', LoginController_1.default);
router.use('/planos', (0, ZeusAuthorize_1.zeusAuthorize)(), PlanosController_1.default);
router.use('/clientes', (0, ZeusAuthorize_1.zeusAuthorize)(), ClientesController_1.default);
router.use('/faturas', (0, ZeusAuthorize_1.zeusAuthorize)(), FaturasController_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map