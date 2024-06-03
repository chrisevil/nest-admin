import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { DeptDto, DeptQueryDto } from './dept.dto';
import { DeptService } from './dept.service';
export declare const permissions: {
    readonly LIST: "system:dept:list";
    readonly CREATE: "system:dept:create";
    readonly READ: "system:dept:read";
    readonly UPDATE: "system:dept:update";
    readonly DELETE: "system:dept:delete";
};
export declare class DeptController {
    private deptService;
    constructor(deptService: DeptService);
    list(dto: DeptQueryDto, uid: number): Promise<DeptEntity[]>;
    create(dto: DeptDto): Promise<void>;
    info(id: number): Promise<DeptEntity>;
    update(id: number, updateDeptDto: DeptDto): Promise<void>;
    delete(id: number): Promise<void>;
}
