import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from './config';
export declare function setupSwagger(app: INestApplication, configService: ConfigService<ConfigKeyPaths>): void;
