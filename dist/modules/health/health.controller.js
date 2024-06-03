"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = exports.PermissionHealth = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const permission_decorator_1 = require("../auth/decorators/permission.decorator");
exports.PermissionHealth = (0, permission_decorator_1.definePermission)('app:health', {
    NETWORK: 'network',
    DB: 'database',
    MH: 'memory-heap',
    MR: 'memory-rss',
    DISK: 'disk',
});
let HealthController = class HealthController {
    http;
    db;
    memory;
    disk;
    constructor(http, db, memory, disk) {
        this.http = http;
        this.db = db;
        this.memory = memory;
        this.disk = disk;
    }
    async checkNetwork() {
        return this.http.pingCheck('buqiyuan', 'https://buqiyuan.gitee.io/');
    }
    async checkDatabase() {
        return this.db.pingCheck('database');
    }
    async checkMemoryHeap() {
        return this.memory.checkHeap('memory-heap', 200 * 1024 * 1024);
    }
    async checkMemoryRSS() {
        return this.memory.checkRSS('memory-rss', 200 * 1024 * 1024);
    }
    async checkDisk() {
        return this.disk.checkStorage('disk', {
            thresholdPercent: 0.75,
            path: '/',
        });
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('network'),
    (0, terminus_1.HealthCheck)(),
    (0, permission_decorator_1.Perm)(exports.PermissionHealth.NETWORK),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkNetwork", null);
__decorate([
    (0, common_1.Get)('database'),
    (0, terminus_1.HealthCheck)(),
    (0, permission_decorator_1.Perm)(exports.PermissionHealth.DB),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDatabase", null);
__decorate([
    (0, common_1.Get)('memory-heap'),
    (0, terminus_1.HealthCheck)(),
    (0, permission_decorator_1.Perm)(exports.PermissionHealth.MH),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkMemoryHeap", null);
__decorate([
    (0, common_1.Get)('memory-rss'),
    (0, terminus_1.HealthCheck)(),
    (0, permission_decorator_1.Perm)(exports.PermissionHealth.MR),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkMemoryRSS", null);
__decorate([
    (0, common_1.Get)('disk'),
    (0, terminus_1.HealthCheck)(),
    (0, permission_decorator_1.Perm)(exports.PermissionHealth.DISK),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDisk", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health - 健康检查'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HttpHealthIndicator,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map