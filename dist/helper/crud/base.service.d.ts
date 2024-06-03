import { ObjectLiteral, Repository } from 'typeorm';
import { PagerDto } from '~/common/dto/pager.dto';
import { Pagination } from '../paginate/pagination';
export declare class BaseService<E extends ObjectLiteral, R extends Repository<E> = Repository<E>> {
    private repository;
    constructor(repository: R);
    list({ page, pageSize, field, order, ...query }: PagerDto): Promise<Pagination<E>>;
    findOne(id: number): Promise<E>;
    create(dto: any): Promise<E>;
    update(id: number, dto: any): Promise<void>;
    delete(id: number): Promise<void>;
}
