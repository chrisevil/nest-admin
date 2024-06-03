import { FastifyMultipartBaseOptions, MultipartFile } from '@fastify/multipart';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
type FileLimit = Pick<FastifyMultipartBaseOptions['limits'], 'fileSize' | 'files'> & {
    mimetypes?: string[];
};
export declare class FileConstraint implements ValidatorConstraintInterface {
    validate(value: MultipartFile, args: ValidationArguments): boolean;
    defaultMessage(_args: ValidationArguments): string;
}
export declare function IsFile(limits?: FileLimit, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
export {};
