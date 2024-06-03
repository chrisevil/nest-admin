"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = exports.MISSION_DECORATOR_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MISSION_DECORATOR_KEY = 'decorator:mission';
const Mission = () => (0, common_1.SetMetadata)(exports.MISSION_DECORATOR_KEY, true);
exports.Mission = Mission;
//# sourceMappingURL=mission.decorator.js.map