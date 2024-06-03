import { EntityManager, Repository, TreeRepository } from 'typeorm';
import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { DeptDto, DeptQueryDto, MoveDept } from './dept.dto';
export declare class DeptService {
    private userRepository;
    private deptRepository;
    private entityManager;
    constructor(userRepository: Repository<UserEntity>, deptRepository: TreeRepository<DeptEntity>, entityManager: EntityManager);
    list(): Promise<DeptEntity[]>;
    info(id: number): Promise<DeptEntity>;
    create({ parentId, ...data }: DeptDto): Promise<void>;
    update(id: number, { parentId, ...data }: DeptDto): Promise<void>;
    delete(id: number): Promise<void>;
    move(depts: MoveDept[]): Promise<void>;
    countUserByDeptId(id: number): Promise<number>;
    countChildDept(id: number): Promise<number>;
    getDeptTree(uid: number, { name }: DeptQueryDto): Promise<DeptEntity[]>;
}
