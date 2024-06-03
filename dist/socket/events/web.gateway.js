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
exports.WebEventsGateway = void 0;
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const token_service_1 = require("../../modules/auth/services/token.service");
const cache_service_1 = require("../../shared/redis/cache.service");
const auth_gateway_1 = require("../shared/auth.gateway");
const AuthGateway = (0, auth_gateway_1.createAuthGateway)({ namespace: 'web' });
let WebEventsGateway = class WebEventsGateway extends AuthGateway {
    jwtService;
    tokenService;
    cacheService;
    constructor(jwtService, tokenService, cacheService) {
        super(jwtService, tokenService, cacheService);
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.cacheService = cacheService;
    }
    _server;
    get server() {
        return this._server;
    }
};
exports.WebEventsGateway = WebEventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebEventsGateway.prototype, "_server", void 0);
exports.WebEventsGateway = WebEventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'web' }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        token_service_1.TokenService,
        cache_service_1.CacheService])
], WebEventsGateway);
//# sourceMappingURL=web.gateway.js.map