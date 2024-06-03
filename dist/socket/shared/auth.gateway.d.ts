import type { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { BroadcastBaseGateway } from '../base.gateway';
export interface AuthGatewayOptions {
    namespace: string;
}
export interface IAuthGateway extends OnGatewayConnection, OnGatewayDisconnect, BroadcastBaseGateway {
}
export declare function createAuthGateway(options: AuthGatewayOptions): new (...args: any[]) => IAuthGateway;
