import { ObjectLiteral, ObjectType, Repository } from 'typeorm';
export type Condition<E extends ObjectLiteral = any> = (Repository: Repository<E>, items: number[], user: IAuthUser) => Promise<boolean>;
export interface ResourceObject {
    entity: ObjectType<any>;
    condition: Condition;
}
export declare function Resource<E extends ObjectLiteral = any>(entity: ObjectType<E>, condition?: Condition<E>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
