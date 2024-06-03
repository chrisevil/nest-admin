"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../auth.constant");
function Resource(entity, condition) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(auth_constant_1.RESOURCE_KEY, { entity, condition }));
}
exports.Resource = Resource;
//# sourceMappingURL=resource.decorator.js.map