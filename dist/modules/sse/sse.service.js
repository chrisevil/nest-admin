"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const system_constant_1 = require("../../constants/system.constant");
const role_entity_1 = require("../system/role/role.entity");
const user_entity_1 = require("../user/user.entity");
const clientMap = new Map();
let SseService = class SseService {
    addClient(uid, subscriber) {
        const clients = clientMap.get(uid) || [];
        clientMap.set(uid, clients.concat(subscriber));
    }
    removeClient(uid, subscriber) {
        const clients = clientMap.get(uid);
        const targetIndex = clients?.findIndex(client => client === subscriber);
        if (targetIndex !== -1)
            clients?.splice(targetIndex, 1).at(0)?.complete();
    }
    removeClients(uid) {
        const clients = clientMap.get(uid);
        clients?.forEach((client) => {
            client?.complete();
        });
        clientMap.delete(uid);
    }
    sendToClients(uid, data) {
        const clients = clientMap.get(uid);
        clients?.forEach((client) => {
            client?.next?.(data);
        });
    }
    sendToAllUser(data) {
        clientMap.forEach((client, uid) => {
            this.sendToClients(uid, data);
        });
    }
    async noticeClientToUpdateMenusByUserIds(uid) {
        const userIds = [].concat(uid);
        userIds.forEach((uid) => {
            this.sendToClients(uid, { type: 'updatePermsAndMenus' });
        });
    }
    async noticeClientToUpdateMenusByMenuIds(menuIds) {
        const roleMenus = await role_entity_1.RoleEntity.find({
            where: {
                menus: {
                    id: (0, typeorm_1.In)(menuIds),
                },
            },
        });
        const roleIds = roleMenus.map(n => n.id).concat(system_constant_1.ROOT_ROLE_ID);
        await this.noticeClientToUpdateMenusByRoleIds(roleIds);
    }
    async noticeClientToUpdateMenusByRoleIds(roleIds) {
        const users = await user_entity_1.UserEntity.find({
            where: {
                roles: {
                    id: (0, typeorm_1.In)(roleIds),
                },
            },
        });
        if (users) {
            const userIds = users.map(n => n.id);
            await this.noticeClientToUpdateMenusByUserIds(userIds);
        }
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)()
], SseService);
//# sourceMappingURL=sse.service.js.map