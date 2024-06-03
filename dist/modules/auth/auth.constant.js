"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.AuthStrategy = exports.ALLOW_ANON_KEY = exports.RESOURCE_KEY = exports.PERMISSION_KEY = exports.PUBLIC_KEY = void 0;
exports.PUBLIC_KEY = '__public_key__';
exports.PERMISSION_KEY = '__permission_key__';
exports.RESOURCE_KEY = '__resource_key__';
exports.ALLOW_ANON_KEY = '__allow_anon_permission_key__';
exports.AuthStrategy = {
    LOCAL: 'local',
    LOCAL_EMAIL: 'local_email',
    LOCAL_PHONE: 'local_phone',
    JWT: 'jwt',
    GITHUB: 'github',
    GOOGLE: 'google',
};
exports.Roles = {
    ADMIN: 'admin',
    USER: 'user',
};
//# sourceMappingURL=auth.constant.js.map