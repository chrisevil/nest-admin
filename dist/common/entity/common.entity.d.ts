import { BaseEntity } from 'typeorm';
export declare abstract class CommonEntity extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare abstract class CompleteEntity extends CommonEntity {
    createBy: number;
    updateBy: number;
    creator: string;
    updater: string;
}
