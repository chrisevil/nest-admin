import { CommonEntity } from '~/common/entity/common.entity';
export declare class CaptchaLogEntity extends CommonEntity {
    userId: number;
    account: string;
    code: string;
    provider: 'sms' | 'email';
}
