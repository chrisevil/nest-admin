import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Redis from 'ioredis';
import { IAppConfig } from '~/config';
import { AuthService } from '~/modules/auth/auth.service';
import { TokenService } from '../services/token.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    private authService;
    private tokenService;
    private readonly redis;
    private appConfig;
    jwtFromRequestFn: import("passport-jwt").JwtFromRequestFunction<any>;
    constructor(reflector: Reflector, authService: AuthService, tokenService: TokenService, redis: Redis, appConfig: IAppConfig);
    canActivate(context: ExecutionContext): Promise<any>;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
