import ReactPaginate from "react-paginate";

type AppPaginateProps = {
    pageCount: number, 
    index: number, 
    handlePageChange: ({ selected } : { selected: number }) => void ,
}
function AppPaginate({ pageCount, index, handlePageChange }: AppPaginateProps) {
    
    //Knopfe STILEN
    const paginateContainerClassName = 'd-flex justify-content-between align-items-center gap-0 w-auto mx-auto p-0 list-style-none';
    const paginateLinkClassName = 'btn text-decoration-none fw-bold' ;
    const paginateItemClassName = 'btn text-decoration-none fw-bold';
    
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
                    ></ReactPaginate>;
}

export default AppPaginate; 