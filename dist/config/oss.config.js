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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OssConfig = exports.ossRegToken = void 0;
const config_1 = require("@nestjs/config");
const qiniu = __importStar(require("qiniu"));
const env_1 = require("../global/env");
function parseZone(zone) {
    switch (zone) {
        case 'Zone_as0':
            return qiniu.zone.Zone_as0;
        case 'Zone_na0':
            return qiniu.zone.Zone_na0;
        case 'Zone_z0':
            return qiniu.zone.Zone_z0;
        case 'Zone_z1':
            return qiniu.zone.Zone_z1;
        case 'Zone_z2':
            return qiniu.zone.Zone_z2;
    }
}
exports.ossRegToken = 'oss';
exports.OssConfig = (0, config_1.registerAs)(exports.ossRegToken, () => ({
    accessKey: (0, env_1.env)('OSS_ACCESSKEY'),
    secretKey: (0, env_1.env)('OSS_SECRETKEY'),
    domain: (0, env_1.env)('OSS_DOMAIN'),
    bucket: (0, env_1.env)('OSS_BUCKET'),
    zone: parseZone((0, env_1.env)('OSS_ZONE') || 'Zone_z2'),
    access: (0, env_1.env)('OSS_ACCESS_TYPE') || 'public',
}));
//# sourceMappingURL=oss.config.js.map