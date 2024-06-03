import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export declare class IsCronExpression implements ValidatorConstraintInterface {
    validate(value: string, _args: ValidationArguments): boolean;
    defaultMessage(_args: ValidationArguments): string;
}
export declare class TaskDto {
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit?: number;
    cron: string;
    every?: number;
    data?: string;
    remark?: string;
}
declare const TaskUpdateDto_base: import("@nestjs/common").Type<Partial<TaskDto>>;
export declare class TaskUpdateDto extends TaskUpdateDto_base {
}
declare const TaskQueryDto_base: import("@nestjs/common").Type<PagerDto<unknown> & Partial<TaskDto>>;
export declare class TaskQueryDto extends TaskQueryDto_base {
}
export {};
