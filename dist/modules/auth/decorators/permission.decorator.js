"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinePermissions = exports.definePermission = exports.Perm = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const auth_constant_1 = require("../auth.constant");
function Perm(permission) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(auth_constant_1.PERMISSION_KEY, permission));
}
exports.Perm = Perm;
let permissions = [];
function definePermission(modulePrefix, actions) {
    if ((0, lodash_1.isPlainObject)(actions)) {
        Object.entries(actions).forEach(([key, action]) => {
            actions[key] = `${modulePrefix}:${action}`;
        });
        permissions = [...new Set([...permissions, ...Object.values(actions)])];
        return actions;
    }
    else if (Array.isArray(actions)) {
        const permissionFormats = actions.map(action => `${modulePrefix}:${action}`);
        permissions = [...new Set([...permissions, ...permissionFormats])];
        return actions.reduce((prev, action) => {
            prev[action.toUpperCase()] = `${modulePrefix}:${action}`;
            return prev;
        }, {});
    }
}
exports.definePermission = definePermission;
const getDefinePermissions = () => permissions;
exports.getDefinePermissions = getDefinePermissions;
//# sourceMappingURL=permission.decorator.js.map