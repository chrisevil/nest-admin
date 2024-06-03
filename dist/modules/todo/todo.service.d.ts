import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { TodoEntity } from '~/modules/todo/todo.entity';
import { TodoDto, TodoQueryDto, TodoUpdateDto } from './todo.dto';
export declare class TodoService {
    private todoRepository;
    constructor(todoRepository: Repository<TodoEntity>);
    list({ page, pageSize, }: TodoQueryDto): Promise<Pagination<TodoEntity>>;
    detail(id: number): Promise<TodoEntity>;
    create(dto: TodoDto): Promise<void>;
    update(id: number, dto: TodoUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
}
