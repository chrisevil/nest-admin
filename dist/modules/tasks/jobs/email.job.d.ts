import { LoggerService } from '~/shared/logger/logger.service';
import { MailerService } from '~/shared/mailer/mailer.service';
export declare class EmailJob {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: MailerService, logger: LoggerService);
    send(config: any): Promise<void>;
}
