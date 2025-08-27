"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const Exception_1 = require("../../shared/exception/Exception");
const InvalidLoginException_1 = require("../../shared/exception/InvalidLoginException");
const ValidationErrorException_1 = require("../../shared/exception/ValidationErrorException");
function errorHandler(err, req, res, next) {
    if (err instanceof Exception_1.Exception) {
        if (err instanceof ValidationErrorException_1.ValidationErrorException) {
            return res.status(400).json({ errors: err.errors });
        }
        if (err instanceof InvalidLoginException_1.InvalidLoginException) {
            return res.status(401).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro desconhecido' });
}
//# sourceMappingURL=ExceptionFilter.js.map