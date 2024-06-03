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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../common/entity/common.entity");
const user_entity_1 = require("../user/user.entity");
let TodoEntity = class TodoEntity extends common_entity_1.CommonEntity {
    value;
    status;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, status: { required: true, type: () => Boolean }, user: { required: true, type: () => require("../user/user.entity").UserEntity } };
    }
};
exports.TodoEntity = TodoEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'todo' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'todo' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TodoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], TodoEntity.prototype, "user", void 0);
exports.TodoEntity = TodoEntity = __decorate([
    (0, typeorm_1.Entity)('todo')
], TodoEntity);
//# sourceMappingURL=todo.entity.js.map