import ReactPaginate from "react-paginate";


export default function ArrayPagination ({ count, handlePageChange }: { count: number, handlePageChange: (selectedItem: { selected: number; }) => void  }) {

    return (
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={count}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className='pagination-ul'
        pageClassName="pagination-li"
        activeClassName="active"
        nextClassName="next"
        previousClassName="prev"
        >
        </ReactPaginate>
    
  );
}

