// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchQuotes, useQuoteState, type IQuoteState } from "../../store/quotesSlice/quotesSlice";
// import { BsPencilSquare } from "react-icons/bs";
// import type { AppDispatch } from "../../store";
// import QuotePreview from "./QuotePreview";
// import AppPaginate from "../Widgets/Paginate/AppPaginate";


// export function QuotePage() {
//     const { quotes, status, error }: IQuoteState = useQuoteState();
//     // const [ page, setPage ] = useState<number>(0);
//     const dispatch = useDispatch<AppDispatch>()
    
//     useEffect(() => {
//       dispatch(fetchQuotes());
    
    
//     }, [])
    
//     const handlePageChange = ({ selected } : { selected: number }) => {
//         if (!quotes) return;
//             console.log(selected)
//     }
//     const handlePageClick = (clickEvent: {
//     index: number | null;
//     selected: number;
//     nextSelectedPage: number | undefined;
//     event: object;
//     isPrevious: boolean;
//     isNext: boolean;
//     isBreak: boolean;
//     isActive: boolean;
//   }) => {
//     console.log(clickEvent)
        
//     }
//     // useEffect(() => {
//     //     dispatch(getQuotesThunk());
//     // }, []);

    
//     return status === 'loading'  ? 
//         <div>Loading</div>
//         :
//         status === 'failed' ?
//         <div>Error: {error}</div>
//         :
//         <>
//         <div className="container">
//             <div className="row">
//                 <div className="text-animated-wrapper">
//                     <span className="fs-6">{`All quotes`}</span>
//                     <h1>Amazing quotes</h1>
//                     <span>Your place to grow</span>
//                 </div>
//                 <BsPencilSquare></BsPencilSquare>
//             </div>
//             <div className="row">
//                 {quotes.map((q) => <QuotePreview quote={q}></QuotePreview>)}
//             </div>
//             <div className="row">
//                 <AppPaginate pageCount={quotes.length / 3} index={0} handlePageChange={handlePageChange} handlePageClick={handlePageClick}></AppPaginate>
//             </div>
//             <div className="row">
//                 <div className="d-flex justify-content-center align-items-center gap-2"></div>
//             </div>
//         </div>
//         </>;
        
// }

// export default QuotePage; 