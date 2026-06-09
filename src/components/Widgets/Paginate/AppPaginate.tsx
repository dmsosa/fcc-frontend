import ReactPaginate from "react-paginate";

type AppPaginateProps = {
    pageCount: number, 
    index: number, 
    clazz?: string, 
    handlePageChange: ({ selected } : { selected: number }) => void ,
}
function AppPaginate({ pageCount, index, clazz="", handlePageChange }: AppPaginateProps) {
    
    //Knopfe STILEN
    const paginateContainerClassName = 'd-flex justify-content-between align-items-center gap-1 w-fit mt-3 mx-auto p-0 list-style-none';
    const paginateLinkClassName = 'btn btn-regular text-decoration-none fw-bold' ;
    const paginateItemClassName = 'btn btn-regular text-decoration-none fw-bold';
    
    return      <ReactPaginate
                    pageCount={pageCount}
                    forcePage={index}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    containerClassName={paginateContainerClassName}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    previousLinkClassName={paginateLinkClassName}
                    nextLinkClassName={paginateLinkClassName}
                    pageClassName={paginateItemClassName}
                    activeLinkClassName="text-primary"
                    onPageChange={handlePageChange}
                    className={clazz}
                    ></ReactPaginate>;
}

export default AppPaginate; 