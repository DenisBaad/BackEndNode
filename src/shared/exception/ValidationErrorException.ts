import { Exception } from './Exception';

export class ValidationErrorException extends Exception {
    public errors: any;
    constructor(errors: any) {
        super("Validation error");
        this.errors = errors;
    }
}