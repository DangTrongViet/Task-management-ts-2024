"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const paginationHelper = (objPagination, query, countRecord) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objPagination.limitItems = parseInt(query.limit);
    }
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;
    objPagination.totalPage = Math.ceil(countRecord / objPagination.limitItems);
    return objPagination;
};
exports.default = paginationHelper;
