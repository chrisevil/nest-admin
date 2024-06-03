import Redis from 'ioredis';
import { ImageCaptchaDto } from '../dto/captcha.dto';
import { ImageCaptcha } from '../models/auth.model';
export declare class CaptchaController {
    private redis;
    constructor(redis: Redis);
    captchaByImg(dto: ImageCaptchaDto): Promise<ImageCaptcha>;
}
