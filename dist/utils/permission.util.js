"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsDemoMode = exports.generatorMenu = exports.generatorRouters = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../global/env");
const is_util_1 = require("./is.util");
const tool_util_1 = require("./tool.util");
function createRoute(menu, _isRoot) {
    const commonMeta = {
        title: menu.name,
        icon: menu.icon,
        isExt: menu.isExt,
        extOpenMode: menu.extOpenMode,
        type: menu.type,
        orderNo: menu.orderNo,
        show: menu.show,
        activeMenu: menu.activeMenu,
        status: menu.status,
        keepAlive: menu.keepAlive,
    };
    if ((0, is_util_1.isExternal)(menu.path)) {
        return {
            id: menu.id,
            path: menu.path,
            name: menu.name,
            meta: { ...commonMeta },
        };
    }
    if (menu.type === 0) {
        return {
            id: menu.id,
            path: menu.path,
            component: menu.component,
            name: menu.name,
            meta: { ...commonMeta },
        };
    }
    return {
        id: menu.id,
        path: menu.path,
        name: menu.name,
        component: menu.component,
        meta: {
            ...commonMeta,
        },
    };
}
function filterAsyncRoutes(menus, parentRoute) {
    const res = [];
    menus.forEach((menu) => {
        if (menu.type === 2 || !menu.status) {
            return;
        }
        let realRoute;
        const genFullPath = (path, parentPath) => {
            return (0, tool_util_1.uniqueSlash)(path.startsWith('/') ? path : `/${parentPath}/${path}`);
        };
        if (!parentRoute && !menu.parentId && menu.type === 1) {
            realRoute = createRoute(menu, true);
        }
        else if (!parentRoute && !menu.parentId && menu.type === 0) {
            const childRoutes = filterAsyncRoutes(menus, menu);
            realRoute = createRoute(menu, true);
            if (childRoutes && childRoutes.length > 0) {
                realRoute.redirect = genFullPath(childRoutes[0].path, realRoute.path);
                realRoute.children = childRoutes;
            }
        }
        else if (parentRoute
            && parentRoute.id === menu.parentId
            && menu.type === 1) {
            realRoute = createRoute(menu, false);
        }
        else if (parentRoute
            && parentRoute.id === menu.parentId
            && menu.type === 0) {
            const childRoutes = filterAsyncRoutes(menus, menu);
            realRoute = createRoute(menu, false);
            if (childRoutes && childRoutes.length > 0) {
                realRoute.redirect = genFullPath(childRoutes[0].path, realRoute.path);
                realRoute.children = childRoutes;
            }
        }
        if (realRoute)
            res.push(realRoute);
    });
    return res;
}
function generatorRouters(menus) {
    return filterAsyncRoutes(menus, null);
}
exports.generatorRouters = generatorRouters;
function filterMenuToTable(menus, parentMenu) {
    const res = [];
    menus.forEach((menu) => {
        let realMenu;
        if (!parentMenu && !menu.parentId && menu.type === 1) {
            const childMenu = filterMenuToTable(menus, menu);
            realMenu = { ...menu };
            realMenu.children = childMenu;
        }
        else if (!parentMenu && !menu.parentId && menu.type === 0) {
            const childMenu = filterMenuToTable(menus, menu);
            realMenu = { ...menu };
            realMenu.children = childMenu;
        }
        else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 1) {
            const childMenu = filterMenuToTable(menus, menu);
            realMenu = { ...menu };
            realMenu.children = childMenu;
        }
        else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 0) {
            const childMenu = filterMenuToTable(menus, menu);
            realMenu = { ...menu };
            realMenu.children = childMenu;
        }
        else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 2) {
            realMenu = { ...menu };
        }
        if (realMenu) {
            realMenu.pid = menu.id;
            res.push(realMenu);
        }
    });
    return res;
}
function generatorMenu(menu) {
    return filterMenuToTable(menu, null);
}
exports.generatorMenu = generatorMenu;
function checkIsDemoMode() {
    if ((0, env_1.envBoolean)('IS_DEMO'))
        throw new common_1.ForbiddenException('演示模式下不允许操作');
}
exports.checkIsDemoMode = checkIsDemoMode;
//# sourceMappingURL=permission.util.js.map