import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenController {
  private readonly lifeTimeMinutesToken: number;
  private readonly securityKey: string;

  constructor(securityKey: string, lifeTimeMinutesToken: number) {
    this.securityKey = securityKey;
    this.lifeTimeMinutesToken = lifeTimeMinutesToken;
  }

  create(userId: string): string {
    const payload = { userId };

    const token = jwt.sign(payload, this.securityKey, {
      expiresIn: `${this.lifeTimeMinutesToken}m`, 
      algorithm: 'HS256'
    });

    return token;
  }

  validate(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.securityKey, {
        algorithms: ['HS256']
      });

      if (typeof decoded === 'string') 
        throw new Error('Token inválido');

      return decoded;
    } catch (err) {
      throw new Error('Token inválido ou expirado');
    }
  }

  getUserId(token: string): string {
    const payload = this.validate(token);
    return payload.userId as string;
  }
}