"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uri = exports.Ip = void 0;
const common_1 = require("@nestjs/common");
const ip_util_1 = require("../../utils/ip.util");
exports.Ip = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    return (0, ip_util_1.getIp)(request);
});
exports.Uri = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    return request.routerPath;
});
//# sourceMappingURL=http.decorator.js.map