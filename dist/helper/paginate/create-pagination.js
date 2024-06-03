"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationObject = void 0;
const pagination_1 = require("./pagination");
function createPaginationObject({ items, totalItems, currentPage, limit, }) {
    const totalPages = totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined;
    const meta = {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage,
    };
    return new pagination_1.Pagination(items, meta);
}
exports.createPaginationObject = createPaginationObject;
//# sourceMappingURL=create-pagination.js.map