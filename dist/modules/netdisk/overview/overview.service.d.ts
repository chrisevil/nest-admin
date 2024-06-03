import { HttpService } from '@nestjs/axios';
import { IOssConfig } from '~/config';
import { CountInfo, FlowInfo, HitInfo, SpaceInfo } from './overview.dto';
export declare class NetDiskOverviewService {
    private qiniuConfig;
    private readonly httpService;
    private mac;
    private readonly FORMAT;
    constructor(qiniuConfig: IOssConfig, httpService: HttpService);
    getStartAndEndDate(start: Date, end?: Date): string[];
    getStatisticUrl(type: string, queryParams?: {}): string;
    getStatisticData(url: string): Promise<import("axios").AxiosResponse<any, any>>;
    getZeroHourToDay(current: Date): Date;
    getZeroHourAnd1Day(current: Date): Date;
    getSpace(beginDate: Date, endDate?: Date): Promise<SpaceInfo>;
    getCount(beginDate: Date, endDate?: Date): Promise<CountInfo>;
    getFlow(beginDate: Date, endDate?: Date): Promise<FlowInfo>;
    getHit(beginDate: Date, endDate?: Date): Promise<HitInfo>;
}
