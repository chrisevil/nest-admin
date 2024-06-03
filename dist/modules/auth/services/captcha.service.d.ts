import Redis from 'ioredis';
import { CaptchaLogService } from '~/modules/system/log/services/captcha-log.service';
export declare class CaptchaService {
    private redis;
    private captchaLogService;
    constructor(redis: Redis, captchaLogService: CaptchaLogService);
    checkImgCaptcha(id: string, code: string): Promise<void>;
    log(account: string, code: string, provider: 'sms' | 'email', uid?: number): Promise<void>;
}
