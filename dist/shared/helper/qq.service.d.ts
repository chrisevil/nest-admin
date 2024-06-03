import { HttpService } from '@nestjs/axios';
export declare class QQService {
    private readonly http;
    constructor(http: HttpService);
    getNickname(qq: string | number): Promise<any>;
    getAvater(qq: string | number): Promise<string>;
}
