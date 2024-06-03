import type { RedisKeys } from '~/constants/cache.constant';
type Prefix = 'm-shop';
export declare function getRedisKey<T extends string = RedisKeys | '*'>(key: T, ...concatKeys: string[]): `${Prefix}:${T}${string | ''}`;
export {};
