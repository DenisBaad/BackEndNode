"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorException = void 0;
const Exception_1 = require("./Exception");
class ValidationErrorException extends Exception_1.Exception {
    errors;
    constructor(errors) {
        super("Validation error");
        this.errors = errors;
    }
}
exports.ValidationErrorException = ValidationErrorException;
//# sourceMappingURL=ValidationErrorException.js.map