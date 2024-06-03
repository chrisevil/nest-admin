export declare function genCaptchaImgKey(val: string | number): `captcha:img:${string}`;
export declare function genAuthTokenKey(val: string | number): `auth:token:${string}`;
export declare function genAuthPermKey(val: string | number): `auth:permission:${string}`;
export declare function genAuthPVKey(val: string | number): `auth:passwordVersion:${string}`;
export declare function genOnlineUserKey(tokenId: string): `online:user:${string}`;
export declare function genTokenBlacklistKey(tokenId: string): `token:blacklist:${string}`;
