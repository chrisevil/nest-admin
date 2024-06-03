import type { Socket } from 'socket.io';
import { BusinessEvents } from './business-event.constant';
export declare abstract class BaseGateway {
    gatewayMessageFormat(type: BusinessEvents, message: any, code?: number): {
        type: BusinessEvents;
        data: any;
        code: number;
    };
    handleDisconnect(client: Socket): void;
    handleConnect(client: Socket): void;
}
export declare abstract class BroadcastBaseGateway extends BaseGateway {
    broadcast(event: BusinessEvents, data: any): void;
}
