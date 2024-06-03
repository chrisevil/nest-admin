import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { DataSource, ObjectType } from 'typeorm';
export declare class EntityExistConstraint implements ValidatorConstraintInterface {
    private dataSource;
    constructor(dataSource: DataSource);
    validate(value: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
declare function IsEntityExist(entity: ObjectType<any>, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
declare function IsEntityExist(condition: {
    entity: ObjectType<any>;
    field?: string;
}, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
export { IsEntityExist };
