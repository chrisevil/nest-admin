import { BaseEntity } from 'typeorm';
import { UserEntity } from '~/modules/user/user.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
export declare class AccessTokenEntity extends BaseEntity {
    id: string;
    value: string;
    expired_at: Date;
    created_at: Date;
    refreshToken: RefreshTokenEntity;
    user: UserEntity;
}
