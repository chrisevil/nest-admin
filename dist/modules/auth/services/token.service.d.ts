import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import Redis from 'ioredis';
import { ISecurityConfig } from '~/config';
import { RoleService } from '~/modules/system/role/role.service';
import { AccessTokenEntity } from '../entities/access-token.entity';
export declare class TokenService {
    private jwtService;
    private roleService;
    private redis;
    private securityConfig;
    constructor(jwtService: JwtService, roleService: RoleService, redis: Redis, securityConfig: ISecurityConfig);
    refreshToken(accessToken: AccessTokenEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateJwtSign(payload: any): string;
    generateAccessToken(uid: number, roles?: string[]): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateRefreshToken(accessToken: AccessTokenEntity, now: dayjs.Dayjs): Promise<string>;
    checkAccessToken(value: string): Promise<boolean>;
    removeAccessToken(value: string): Promise<void>;
    removeRefreshToken(value: string): Promise<void>;
    verifyAccessToken(token: string): Promise<IAuthUser>;
}
