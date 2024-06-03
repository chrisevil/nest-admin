import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { DataSource, ObjectType } from 'typeorm';
interface Condition {
    entity: ObjectType<any>;
    field?: string;
}
export declare class UniqueConstraint implements ValidatorConstraintInterface {
    private dataSource;
    constructor(dataSource: DataSource);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
declare function IsUnique(entity: ObjectType<any>, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
declare function IsUnique(condition: Condition, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
export { IsUnique };
