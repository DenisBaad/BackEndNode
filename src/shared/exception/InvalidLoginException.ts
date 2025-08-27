import { Exception } from './Exception';

export class InvalidLoginException extends Exception {
  constructor(message = 'Login inválido') { super(message); }
}