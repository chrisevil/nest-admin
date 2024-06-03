export declare class DeptDto {
    name: string;
    parentId: number;
    orderNo: number;
}
export declare class TransferDeptDto {
    userIds: number[];
    deptId: number;
}
export declare class MoveDept {
    id: number;
    parentId: number;
}
export declare class MoveDeptDto {
    depts: MoveDept[];
}
export declare class DeptQueryDto {
    name?: string;
}
