"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisKey = void 0;
const prefix = 'm-shop';
function getRedisKey(key, ...concatKeys) {
    return `${prefix}:${key}${concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''}`;
}
exports.getRedisKey = getRedisKey;
//# sourceMappingURL=redis.util.js.map