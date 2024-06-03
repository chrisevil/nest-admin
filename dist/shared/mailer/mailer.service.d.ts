import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import Redis from 'ioredis';
import { IAppConfig } from '~/config';
export declare class MailerService {
    private appConfig;
    private redis;
    private mailerService;
    constructor(appConfig: IAppConfig, redis: Redis, mailerService: NestMailerService);
    log(to: string, code: string, ip: string): Promise<void>;
    checkCode(to: any, code: any): Promise<void>;
    checkLimit(to: any, ip: any): Promise<void>;
    send(to: any, subject: any, content: string, type?: 'text' | 'html'): Promise<any>;
    sendVerificationCode(to: any, code?: string): Promise<{
        to: any;
        code: string;
    }>;
}
