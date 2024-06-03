import { BeforeApplicationShutdown } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { OnlineService } from '../system/online/online.service';
import { MessageEvent, SseService } from './sse.service';
export declare class SseController implements BeforeApplicationShutdown {
    private readonly sseService;
    private onlineService;
    private replyMap;
    constructor(sseService: SseService, onlineService: OnlineService);
    private closeAllConnect;
    beforeApplicationShutdown(): void;
    sse(uid: number, req: FastifyRequest, res: FastifyReply, ip: string, ua: string): Promise<Observable<MessageEvent>>;
}
