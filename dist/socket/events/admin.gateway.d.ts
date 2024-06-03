import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '~/modules/auth/auth.service';
import { CacheService } from '~/shared/redis/cache.service';
declare const AuthGateway: new (...args: any[]) => import("../shared/auth.gateway").IAuthGateway;
export declare class AdminEventsGateway extends AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
    protected readonly jwtService: JwtService;
    protected readonly authService: AuthService;
    private readonly cacheService;
    constructor(jwtService: JwtService, authService: AuthService, cacheService: CacheService);
    protected _server: Server;
    get server(): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
export {};
