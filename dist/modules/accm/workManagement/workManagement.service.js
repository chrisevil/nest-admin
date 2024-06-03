"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkManagementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../../helper/crud/base.service");
const workManagement_entity_1 = require("./workManagement.entity");
let WorkManagementService = class WorkManagementService extends base_service_1.BaseService {
    accmWorkManagementRepository;
    entityManager;
    constructor(accmWorkManagementRepository, entityManager) {
        super(accmWorkManagementRepository);
        this.accmWorkManagementRepository = accmWorkManagementRepository;
        this.entityManager = entityManager;
    }
    async week({ workStart, workEnd, ...data }) {
        const query = this.accmWorkManagementRepository.createQueryBuilder();
        if (workStart)
            query.andWhere('workStart >= :workStart', { workStart: `${workStart}` });
        if (workEnd)
            query.andWhere('workEnd <= :workEnd', { workEnd: `${workEnd}` });
        query.orderBy({
            userId: 'ASC',
            workStart: 'DESC',
            workImportant: 'ASC',
        });
        return query.getMany();
    }
};
exports.WorkManagementService = WorkManagementService;
exports.WorkManagementService = WorkManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workManagement_entity_1.AccmWorkManagementEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], WorkManagementService);
//# sourceMappingURL=workManagement.service.js.map