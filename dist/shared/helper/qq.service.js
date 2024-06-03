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
exports.QQService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let QQService = class QQService {
    http;
    constructor(http) {
        this.http = http;
    }
    async getNickname(qq) {
        const { data } = await this.http.axiosRef.get(`https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`);
        return data;
    }
    async getAvater(qq) {
        return `https://thirdqq.qlogo.cn/g?b=qq&s=100&nk=${qq}`;
    }
};
exports.QQService = QQService;
exports.QQService = QQService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], QQService);
//# sourceMappingURL=qq.service.js.map