import { Pagination } from '~/helper/paginate/pagination';
import { TodoEntity } from '~/modules/todo/todo.entity';
import { TodoDto, TodoQueryDto, TodoUpdateDto } from './todo.dto';
import { TodoService } from './todo.service';
export declare const permissions: {
    readonly LIST: "todo:list";
    readonly CREATE: "todo:create";
    readonly READ: "todo:read";
    readonly UPDATE: "todo:update";
    readonly DELETE: "todo:delete";
};
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    list(dto: TodoQueryDto): Promise<Pagination<TodoEntity>>;
    info(id: number): Promise<TodoEntity>;
    create(dto: TodoDto): Promise<void>;
    update(id: number, dto: TodoUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
}
