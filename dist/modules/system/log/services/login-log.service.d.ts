import { Repository } from 'typeorm';
import { LoginLogQueryDto } from '../dto/log.dto';
import { LoginLogEntity } from '../entities/login-log.entity';
import { LoginLogInfo } from '../models/log.model';
export declare class LoginLogService {
    private loginLogRepository;
    constructor(loginLogRepository: Repository<LoginLogEntity>);
    create(uid: number, ip: string, ua: string): Promise<void>;
    list({ page, pageSize, username, ip, address, time, }: LoginLogQueryDto): Promise<{
        meta: import("~/helper/paginate/interface").IPaginationMeta;
        items: LoginLogInfo[];
    }>;
    clearLog(): Promise<void>;
    clearLogBeforeTime(time: Date): Promise<void>;
}
