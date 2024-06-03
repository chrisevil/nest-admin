import { BaseEntity } from 'typeorm';
import { AccessTokenEntity } from './access-token.entity';
export declare class RefreshTokenEntity extends BaseEntity {
    id: string;
    value: string;
    expired_at: Date;
    created_at: Date;
    accessToken: AccessTokenEntity;
}
