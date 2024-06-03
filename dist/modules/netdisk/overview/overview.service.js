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
exports.NetDiskOverviewService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const qiniu = __importStar(require("qiniu"));
const config_1 = require("../../../config");
const oss_constant_1 = require("../../../constants/oss.constant");
let NetDiskOverviewService = class NetDiskOverviewService {
    qiniuConfig;
    httpService;
    mac;
    FORMAT = 'YYYYMMDDHHmmss';
    constructor(qiniuConfig, httpService) {
        this.qiniuConfig = qiniuConfig;
        this.httpService = httpService;
        this.mac = new qiniu.auth.digest.Mac(this.qiniuConfig.accessKey, this.qiniuConfig.secretKey);
    }
    getStartAndEndDate(start, end = new Date()) {
        return [(0, dayjs_1.default)(start).format(this.FORMAT), (0, dayjs_1.default)(end).format(this.FORMAT)];
    }
    getStatisticUrl(type, queryParams = {}) {
        const bucketKey = type === 'blob_io' ? '$bucket' : 'bucket';
        const defaultParams = {
            [bucketKey]: this.qiniuConfig.bucket,
            g: 'day',
        };
        const searchParams = new URLSearchParams({ ...defaultParams, ...queryParams });
        return decodeURIComponent(`${oss_constant_1.OSS_API}/v6/${type}?${searchParams}`);
    }
    getStatisticData(url) {
        const accessToken = qiniu.util.generateAccessTokenV2(this.mac, url, 'GET', 'application/x-www-form-urlencoded');
        return this.httpService.axiosRef.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${accessToken}`,
            },
        });
    }
    getZeroHourToDay(current) {
        const year = (0, dayjs_1.default)(current).year();
        const month = (0, dayjs_1.default)(current).month();
        const date = (0, dayjs_1.default)(current).date();
        return new Date(year, month, date, 0);
    }
    getZeroHourAnd1Day(current) {
        const year = (0, dayjs_1.default)(current).year();
        const month = (0, dayjs_1.default)(current).month();
        return new Date(year, month, 1, 0);
    }
    async getSpace(beginDate, endDate = new Date()) {
        const [begin, end] = this.getStartAndEndDate(beginDate, endDate);
        const url = this.getStatisticUrl('space', { begin, end });
        const { data } = await this.getStatisticData(url);
        return {
            datas: data.datas,
            times: data.times.map((e) => {
                return dayjs_1.default.unix(e).date();
            }),
        };
    }
    async getCount(beginDate, endDate = new Date()) {
        const [begin, end] = this.getStartAndEndDate(beginDate, endDate);
        const url = this.getStatisticUrl('count', { begin, end });
        const { data } = await this.getStatisticData(url);
        return {
            times: data.times.map((e) => {
                return dayjs_1.default.unix(e).date();
            }),
            datas: data.datas,
        };
    }
    async getFlow(beginDate, endDate = new Date()) {
        const [begin, end] = this.getStartAndEndDate(beginDate, endDate);
        const url = this.getStatisticUrl('blob_io', { begin, end, $ftype: 0, $src: 'origin', select: 'flow' });
        const { data } = await this.getStatisticData(url);
        const times = [];
        const datas = [];
        data.forEach((e) => {
            times.push((0, dayjs_1.default)(e.time).date());
            datas.push(e.values.flow);
        });
        return {
            times,
            datas,
        };
    }
    async getHit(beginDate, endDate = new Date()) {
        const [begin, end] = this.getStartAndEndDate(beginDate, endDate);
        const url = this.getStatisticUrl('blob_io', { begin, end, $ftype: 0, $src: 'inner', select: 'hit' });
        const { data } = await this.getStatisticData(url);
        const times = [];
        const datas = [];
        data.forEach((e) => {
            times.push((0, dayjs_1.default)(e.time).date());
            datas.push(e.values.hit);
        });
        return {
            times,
            datas,
        };
    }
};
exports.NetDiskOverviewService = NetDiskOverviewService;
exports.NetDiskOverviewService = NetDiskOverviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.OssConfig.KEY)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], NetDiskOverviewService);
//# sourceMappingURL=overview.service.js.map