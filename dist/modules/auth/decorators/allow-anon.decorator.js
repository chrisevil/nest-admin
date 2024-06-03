"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowAnon = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../auth.constant");
const AllowAnon = () => (0, common_1.SetMetadata)(auth_constant_1.ALLOW_ANON_KEY, true);
exports.AllowAnon = AllowAnon;
//# sourceMappingURL=allow-anon.decorator.js.map