import { JwtPayload } from 'jsonwebtoken';
export declare class TokenController {
    private readonly lifeTimeMinutesToken;
    private readonly securityKey;
    constructor(securityKey: string, lifeTimeMinutesToken: number);
    create(userId: string): string;
    validate(token: string): JwtPayload;
    getUserId(token: string): string;
}
//# sourceMappingURL=TokenController.d.ts.map