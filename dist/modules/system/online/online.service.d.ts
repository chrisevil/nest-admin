/// <reference types="lodash" />
import Redis from 'ioredis';
import { AuthService } from '~/modules/auth/auth.service';
import { TokenService } from '~/modules/auth/services/token.service';
import { SseService } from '~/modules/sse/sse.service';
import { UserService } from '../../user/user.service';
import { OnlineUserInfo } from './online.model';
export declare class OnlineService {
    private redis;
    private readonly userService;
    private authService;
    private tokenService;
    private sseService;
    constructor(redis: Redis, userService: UserService, authService: AuthService, tokenService: TokenService, sseService: SseService);
    updateOnlineUserCount: import("lodash").DebouncedFunc<() => Promise<void>>;
    addOnlineUser(value: string, ip: string, ua: string): Promise<void>;
    removeOnlineUser(value: string): Promise<void>;
    clearOnlineUser(): Promise<void>;
    listOnlineUser(value: string): Promise<OnlineUserInfo[]>;
    kickUser(tokenId: string, user: IAuthUser): Promise<void>;
}
