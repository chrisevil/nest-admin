"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../auth.constant");
const Public = () => (0, common_1.SetMetadata)(auth_constant_1.PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map