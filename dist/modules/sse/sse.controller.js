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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const swagger_decorator_1 = require("../../common/decorators/swagger.decorator");
const online_service_1 = require("../system/online/online.service");
const sse_service_1 = require("./sse.service");
let SseController = class SseController {
    sseService;
    onlineService;
    replyMap = new Map();
    constructor(sseService, onlineService) {
        this.sseService = sseService;
        this.onlineService = onlineService;
    }
    closeAllConnect() {
        this.sseService.sendToAllUser({
            type: 'close',
            data: 'bye~',
        });
        this.replyMap.forEach((reply) => {
            reply.raw.end().destroy();
        });
    }
    beforeApplicationShutdown() {
        this.closeAllConnect();
    }
    async sse(uid, req, res, ip, ua) {
        this.replyMap.set(uid, res);
        this.onlineService.addOnlineUser(req.accessToken, ip, ua);
        return new rxjs_1.Observable((subscriber) => {
            const subscription = (0, rxjs_1.interval)(12000).subscribe(() => {
                subscriber.next({ type: 'ping' });
            });
            this.sseService.addClient(uid, subscriber);
            req.raw.on('close', () => {
                subscription.unsubscribe();
                this.sseService.removeClient(uid, subscriber);
                this.replyMap.delete(uid);
                this.onlineService.removeOnlineUser(req.accessToken);
                console.log(`user-${uid}已关闭`);
            });
        });
    }
};
exports.SseController = SseController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '服务端推送消息' }),
    (0, common_1.Sse)(':uid'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('uid', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Ip)()),
    __param(4, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], SseController.prototype, "sse", null);
exports.SseController = SseController = __decorate([
    (0, swagger_1.ApiTags)('System - sse模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('sse'),
    __metadata("design:paramtypes", [sse_service_1.SseService, online_service_1.OnlineService])
], SseController);
//# sourceMappingURL=sse.controller.js.map