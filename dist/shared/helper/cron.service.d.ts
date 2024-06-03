import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from '~/config';
export declare class CronService {
    private readonly configService;
    private logger;
    constructor(configService: ConfigService<ConfigKeyPaths>);
    deleteExpiredJWT(): Promise<void>;
}
