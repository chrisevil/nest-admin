import type { Type } from '@nestjs/common';
export declare function BaseCrudFactory<E extends new (...args: any[]) => any>({ entity, dto, permissions }: {
    entity: E;
    dto?: Type<any>;
    permissions?: Record<string, string>;
}): Type<any>;
