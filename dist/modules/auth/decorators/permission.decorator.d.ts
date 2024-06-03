type TupleToObject<T extends string, P extends ReadonlyArray<string>> = {
    [K in Uppercase<P[number]>]: `${T}:${Lowercase<K>}`;
};
type AddPrefixToObjectValue<T extends string, P extends Record<string, string>> = {
    [K in keyof P]: K extends string ? `${T}:${P[K]}` : never;
};
export declare function Perm(permission: string | string[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function definePermission<T extends string, U extends Record<string, string>>(modulePrefix: T, actionMap: U): AddPrefixToObjectValue<T, U>;
export declare function definePermission<T extends string, U extends ReadonlyArray<string>>(modulePrefix: T, actions: U): TupleToObject<T, U>;
export declare const getDefinePermissions: () => string[];
export {};
