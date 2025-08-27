"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLoginException = void 0;
const Exception_1 = require("./Exception");
class InvalidLoginException extends Exception_1.Exception {
    constructor(message = 'Login inválido') { super(message); }
}
exports.InvalidLoginException = InvalidLoginException;
//# sourceMappingURL=InvalidLoginException.js.map