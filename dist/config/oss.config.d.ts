import { ConfigType } from '@nestjs/config';
import * as qiniu from 'qiniu';
export declare const ossRegToken = "oss";
export declare const OssConfig: (() => {
    accessKey: string;
    secretKey: string;
    domain: string;
    bucket: string;
    zone: qiniu.conf.Zone;
    access: any;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    accessKey: string;
    secretKey: string;
    domain: string;
    bucket: string;
    zone: qiniu.conf.Zone;
    access: any;
}>;
export type IOssConfig = ConfigType<typeof OssConfig>;
