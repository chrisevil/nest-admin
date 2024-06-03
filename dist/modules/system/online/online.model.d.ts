import { LoginLogInfo } from '../log/models/log.model';
declare const OnlineUserInfo_base: import("@nestjs/common").Type<Omit<LoginLogInfo, "id">>;
export declare class OnlineUserInfo extends OnlineUserInfo_base {
    tokenId: string;
    deptName: string;
    uid: number;
    isCurrent?: boolean;
    disable?: boolean;
}
export {};
