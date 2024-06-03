export declare const PUBLIC_KEY = "__public_key__";
export declare const PERMISSION_KEY = "__permission_key__";
export declare const RESOURCE_KEY = "__resource_key__";
export declare const ALLOW_ANON_KEY = "__allow_anon_permission_key__";
export declare const AuthStrategy: {
    readonly LOCAL: "local";
    readonly LOCAL_EMAIL: "local_email";
    readonly LOCAL_PHONE: "local_phone";
    readonly JWT: "jwt";
    readonly GITHUB: "github";
    readonly GOOGLE: "google";
};
export declare const Roles: {
    readonly ADMIN: "admin";
    readonly USER: "user";
};
export type Role = (typeof Roles)[keyof typeof Roles];
