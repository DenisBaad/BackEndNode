import { container } from "tsyringe";
import { Request, Response, NextFunction } from 'express';
import { TokenController } from './../controllers/TokenController';

export function zeusAuthorize() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenController = container.resolve<TokenController>("TokenController");
      const authHeader = req.headers['authorization'];
      
      if (!authHeader) 
        return res.status(401).json({ error: 'Token não informado' });
      
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
      const userId = tokenController.getUserId(token);
      (req as any).userId = userId;
      
      next();
    } catch (error: any) {
      if (error.message.includes('expirado')) {
        return res.status(401).json({ error: 'Token expirado' });
      }
      return res.status(401).json({ error: 'Usuário sem permissão' });
    }
  };
}