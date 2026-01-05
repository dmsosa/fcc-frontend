import { BsPencilSquare } from "react-icons/bs";
import QuotePreview from "./QuotePreview";
import type { TQuote } from "../../store/quotesSlice/quotesSlice";
import useArray from "../../hooks/useArray";
import AppPaginate from "../Widgets/Paginate/AppPaginate";

//Persist data from LS
//1. lookup LS
//2. if found, set it as initialValue
//3. if not, set InitialValue
//4. Save changes to LS when actions are dispatched
export function AllQuotes() {

    const { array, arrayCount, status, error, offset, setOffset } = useArray<TQuote>({serviceName: 'quotes' });
    const handlePageChange = ({ selected } : { selected: number }) => {
        setOffset(selected);
    }
    
    return status === 'loading'  ? 
        <div>Loading</div>
        :
        status === 'failed' ?
        <div>Error: {error}</div>
        :
        <>
        <div className="container row">
            <div className="row">
                <div className="text-animated-wrapper">
                    <span className="fs-6">{`All quotes`}</span>
                    <h1>Amazing quotes</h1>
                    <span>Your place to grow</span>
                </div>
                <BsPencilSquare></BsPencilSquare>
            </div>
            <div className="row">
                {array.map((q) => <QuotePreview quote={q}></QuotePreview>)}
            </div>
            <div className="row">
                <AppPaginate pageCount={Math.ceil(arrayCount / 3)} index={offset} handlePageChange={handlePageChange}></AppPaginate>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center gap-2"></div>
            </div>
        </div>
        </>;
        
}

export default AllQuotes; 