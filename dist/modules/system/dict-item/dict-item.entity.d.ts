import { CompleteEntity } from '~/common/entity/common.entity';
import { DictTypeEntity } from '../dict-type/dict-type.entity';
export declare class DictItemEntity extends CompleteEntity {
    type: DictTypeEntity;
    label: string;
    value: string;
    orderNo: number;
    status: number;
    remark: string;
}
