import { PagerDto } from '~/common/dto/pager.dto';
export declare class LoginLogQueryDto extends PagerDto {
    username: string;
    ip?: string;
    address?: string;
    time?: string[];
}
export declare class TaskLogQueryDto extends PagerDto {
    username: string;
    ip?: string;
    time?: string[];
}
export declare class CaptchaLogQueryDto extends PagerDto {
    username: string;
    code?: string;
    time?: string[];
}
