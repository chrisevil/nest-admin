import { Subscriber } from 'rxjs';
export interface MessageEvent {
    data?: string | number | object;
    id?: string;
    type?: 'ping' | 'close' | 'updatePermsAndMenus' | 'updateOnlineUserCount';
    retry?: number;
}
export declare class SseService {
    addClient(uid: number, subscriber: Subscriber<MessageEvent>): void;
    removeClient(uid: number, subscriber: Subscriber<MessageEvent>): void;
    removeClients(uid: number): void;
    sendToClients(uid: number, data: MessageEvent): void;
    sendToAllUser(data: MessageEvent): void;
    noticeClientToUpdateMenusByUserIds(uid: number | number[]): Promise<void>;
    noticeClientToUpdateMenusByMenuIds(menuIds: number[]): Promise<void>;
    noticeClientToUpdateMenusByRoleIds(roleIds: number[]): Promise<void>;
}
