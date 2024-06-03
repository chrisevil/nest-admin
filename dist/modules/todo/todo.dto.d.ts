import { PagerDto } from '~/common/dto/pager.dto';
export declare class TodoDto {
    value: string;
}
declare const TodoUpdateDto_base: import("@nestjs/common").Type<Partial<TodoDto>>;
export declare class TodoUpdateDto extends TodoUpdateDto_base {
}
declare const TodoQueryDto_base: import("@nestjs/common").Type<PagerDto<unknown> & TodoDto>;
export declare class TodoQueryDto extends TodoQueryDto_base {
}
export {};
