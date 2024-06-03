import { MailerService } from '~/shared/mailer/mailer.service';
import { SendEmailCodeDto } from '../dto/captcha.dto';
export declare class EmailController {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmailCode(dto: SendEmailCodeDto, ip: string): Promise<void>;
}
