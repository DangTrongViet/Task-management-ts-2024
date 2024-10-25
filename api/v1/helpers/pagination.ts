interface objPagination {
    currentPage: number,
    limitItems: number,
    skip?: number,
    totalPage?: number
};
const paginationHelper= (objPagination: objPagination, query: Record<string, any>, countRecord:number): objPagination => {
    if(query.page){
        objPagination.currentPage=parseInt(query.page);
    } 

    if(query.limit){
        objPagination.limitItems=parseInt(query.limit);
    }
    // Tính toán số sản phẩm cần bỏ qua
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;

    // Tính toán tổng số trang dựa trên tổng số sản phẩm
    objPagination.totalPage = Math.ceil(countRecord / objPagination.limitItems);

    return objPagination;
};

export default paginationHelper;