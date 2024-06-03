import { OverviewSpaceInfo } from './overview.dto';
import { NetDiskOverviewService } from './overview.service';
export declare const permissions: {
    readonly DESC: "netdisk:overview:desc";
};
export declare class NetDiskOverviewController {
    private overviewService;
    constructor(overviewService: NetDiskOverviewService);
    space(): Promise<OverviewSpaceInfo>;
}
