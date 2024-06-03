import { DiskHealthIndicator, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare const PermissionHealth: {
    readonly NETWORK: "app:health:network";
    readonly DB: "app:health:database";
    readonly MH: "app:health:memory-heap";
    readonly MR: "app:health:memory-rss";
    readonly DISK: "app:health:disk";
};
export declare class HealthController {
    private http;
    private db;
    private memory;
    private disk;
    constructor(http: HttpHealthIndicator, db: TypeOrmHealthIndicator, memory: MemoryHealthIndicator, disk: DiskHealthIndicator);
    checkNetwork(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
    checkDatabase(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
    checkMemoryHeap(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
    checkMemoryRSS(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
    checkDisk(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
}
