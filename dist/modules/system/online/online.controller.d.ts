import { FastifyRequest } from 'fastify';
import { KickDto } from './online.dto';
import { OnlineUserInfo } from './online.model';
import { OnlineService } from './online.service';
export declare const permissions: {
    LIST: "system:online:list";
    KICK: "system:online:kick";
};
export declare class OnlineController {
    private onlineService;
    constructor(onlineService: OnlineService);
    list(req: FastifyRequest): Promise<OnlineUserInfo[]>;
    kick(dto: KickDto, user: IAuthUser): Promise<void>;
}
