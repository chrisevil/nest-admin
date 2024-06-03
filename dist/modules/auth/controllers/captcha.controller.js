"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaController = void 0;
const openapi = require("@nestjs/swagger");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const svgCaptcha = __importStar(require("svg-captcha"));
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const utils_1 = require("../../../utils");
const public_decorator_1 = require("../decorators/public.decorator");
const captcha_dto_1 = require("../dto/captcha.dto");
const auth_model_1 = require("../models/auth.model");
let CaptchaController = class CaptchaController {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async captchaByImg(dto) {
        const { width, height } = dto;
        const svg = svgCaptcha.create({
            size: 4,
            color: true,
            noise: 4,
            width: (0, lodash_1.isEmpty)(width) ? 100 : width,
            height: (0, lodash_1.isEmpty)(height) ? 50 : height,
            charPreset: '1234567890',
        });
        const result = {
            img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
            id: (0, utils_1.generateUUID)(),
        };
        await this.redis.set((0, genRedisKey_1.genCaptchaImgKey)(result.id), svg.text, 'EX', 60 * 5);
        return result;
    }
};
exports.CaptchaController = CaptchaController;
__decorate([
    (0, common_1.Get)('img'),
    (0, swagger_1.ApiOperation)({ summary: '获取登录图片验证码' }),
    (0, api_result_decorator_1.ApiResult)({ type: auth_model_1.ImageCaptcha }),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200, type: require("../models/auth.model").ImageCaptcha }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [captcha_dto_1.ImageCaptchaDto]),
    __metadata("design:returntype", Promise)
], CaptchaController.prototype, "captchaByImg", null);
exports.CaptchaController = CaptchaController = __decorate([
    (0, swagger_1.ApiTags)('Captcha - 验证码模块'),
    (0, common_1.Controller)('auth/captcha'),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default])
], CaptchaController);
//# sourceMappingURL=captcha.controller.js.map