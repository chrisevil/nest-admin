"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genTokenBlacklistKey = exports.genOnlineUserKey = exports.genAuthPVKey = exports.genAuthPermKey = exports.genAuthTokenKey = exports.genCaptchaImgKey = void 0;
const cache_constant_1 = require("../constants/cache.constant");
function genCaptchaImgKey(val) {
    return `${cache_constant_1.RedisKeys.CAPTCHA_IMG_PREFIX}${String(val)}`;
}
exports.genCaptchaImgKey = genCaptchaImgKey;
function genAuthTokenKey(val) {
    return `${cache_constant_1.RedisKeys.AUTH_TOKEN_PREFIX}${String(val)}`;
}
exports.genAuthTokenKey = genAuthTokenKey;
function genAuthPermKey(val) {
    return `${cache_constant_1.RedisKeys.AUTH_PERM_PREFIX}${String(val)}`;
}
exports.genAuthPermKey = genAuthPermKey;
function genAuthPVKey(val) {
    return `${cache_constant_1.RedisKeys.AUTH_PASSWORD_V_PREFIX}${String(val)}`;
}
exports.genAuthPVKey = genAuthPVKey;
function genOnlineUserKey(tokenId) {
    return `${cache_constant_1.RedisKeys.ONLINE_USER_PREFIX}${String(tokenId)}`;
}
exports.genOnlineUserKey = genOnlineUserKey;
function genTokenBlacklistKey(tokenId) {
    return `${cache_constant_1.RedisKeys.TOKEN_BLACKLIST_PREFIX}${String(tokenId)}`;
}
exports.genTokenBlacklistKey = genTokenBlacklistKey;
//# sourceMappingURL=genRedisKey.js.map