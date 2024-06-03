import { MailerService } from '~/shared/mailer/mailer.service';
import { EmailSendDto } from './email.dto';
export declare class EmailController {
    private emailService;
    constructor(emailService: MailerService);
    send(dto: EmailSendDto): Promise<void>;
}
