"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dict_item_controller_1 = require("./dict-item.controller");
const dict_item_entity_1 = require("./dict-item.entity");
const dict_item_service_1 = require("./dict-item.service");
const services = [dict_item_service_1.DictItemService];
let DictItemModule = class DictItemModule {
};
exports.DictItemModule = DictItemModule;
exports.DictItemModule = DictItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dict_item_entity_1.DictItemEntity])],
        controllers: [dict_item_controller_1.DictItemController],
        providers: [...services],
        exports: [typeorm_1.TypeOrmModule, ...services],
    })
], DictItemModule);
//# sourceMappingURL=dict-item.module.js.map