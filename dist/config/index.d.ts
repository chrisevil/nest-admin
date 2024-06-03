import { IAppConfig, appRegToken } from './app.config';
import { IDatabaseConfig, dbRegToken } from './database.config';
import { IMailerConfig, mailerRegToken } from './mailer.config';
import { IOssConfig, ossRegToken } from './oss.config';
import { IRedisConfig, redisRegToken } from './redis.config';
import { ISecurityConfig, securityRegToken } from './security.config';
import { ISwaggerConfig, swaggerRegToken } from './swagger.config';
export * from './app.config';
export * from './redis.config';
export * from './database.config';
export * from './swagger.config';
export * from './security.config';
export * from './mailer.config';
export * from './oss.config';
export interface AllConfigType {
    [appRegToken]: IAppConfig;
    [dbRegToken]: IDatabaseConfig;
    [mailerRegToken]: IMailerConfig;
    [redisRegToken]: IRedisConfig;
    [securityRegToken]: ISecurityConfig;
    [swaggerRegToken]: ISwaggerConfig;
    [ossRegToken]: IOssConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;
declare const _default: {
    AppConfig: (() => {
        name: string;
        port: number;
        baseUrl: string;
        globalPrefix: string;
        locale: string;
        multiDeviceLogin: boolean;
        logger: {
            level: string;
            maxFiles: number;
        };
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        name: string;
        port: number;
        baseUrl: string;
        globalPrefix: string;
        locale: string;
        multiDeviceLogin: boolean;
        logger: {
            level: string;
            maxFiles: number;
        };
    }>;
    DatabaseConfig: (() => import("typeorm").DataSourceOptions) & import("@nestjs/config").ConfigFactoryKeyHost<import("typeorm").DataSourceOptions>;
    MailerConfig: (() => {
        host: string;
        port: number;
        ignoreTLS: boolean;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        host: string;
        port: number;
        ignoreTLS: boolean;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    }>;
    OssConfig: (() => {
        accessKey: string;
        secretKey: string;
        domain: string;
        bucket: string;
        zone: import("qiniu").conf.Zone;
        access: any;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        accessKey: string;
        secretKey: string;
        domain: string;
        bucket: string;
        zone: import("qiniu").conf.Zone;
        access: any;
    }>;
    RedisConfig: (() => {
        host: string;
        port: number;
        password: string;
        db: number;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        host: string;
        port: number;
        password: string;
        db: number;
    }>;
    SecurityConfig: (() => {
        jwtSecret: string;
        jwtExprire: number;
        refreshSecret: string;
        refreshExpire: number;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        jwtSecret: string;
        jwtExprire: number;
        refreshSecret: string;
        refreshExpire: number;
    }>;
    SwaggerConfig: (() => {
        enable: boolean;
        path: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        enable: boolean;
        path: string;
    }>;
};
export default _default;
