import { Request, Response, NextFunction } from 'express';
import { Exception } from '../../shared/exception/Exception';
import { InvalidLoginException } from '../../shared/exception/InvalidLoginException';
import { ValidationErrorException } from '../../shared/exception/ValidationErrorException';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Exception) {
    
    if (err instanceof ValidationErrorException) {
      return res.status(400).json({ errors: err.errors });
    }
    
    if (err instanceof InvalidLoginException) {
      return res.status(401).json({ message: err.message });
    }
    
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro desconhecido' });
}