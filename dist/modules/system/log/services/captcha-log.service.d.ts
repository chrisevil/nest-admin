import { Repository } from 'typeorm';
import { CaptchaLogQueryDto } from '../dto/log.dto';
import { CaptchaLogEntity } from '../entities/captcha-log.entity';
export declare class CaptchaLogService {
    private captchaLogRepository;
    constructor(captchaLogRepository: Repository<CaptchaLogEntity>);
    create(account: string, code: string, provider: 'sms' | 'email', uid?: number): Promise<void>;
    paginate({ page, pageSize }: CaptchaLogQueryDto): Promise<import("~/helper/paginate/pagination").Pagination<CaptchaLogEntity, import("~/helper/paginate/interface").IPaginationMeta>>;
    clearLog(): Promise<void>;
    clearLogBeforeTime(time: Date): Promise<void>;
}
