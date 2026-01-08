import { Link } from "react-router";
import {  selectQuotesById, type TQuote } from "../../store/quotesSlice/quotesSlice";
import type { MouseEvent } from "react";
import { useAppSelector } from "../../store";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";



//Delete and Edit buttons accept ein Callback, um Additionelles Logik zu laufen
//deleteCallback => pass actual dispatch to 
export function QuotePreview({ quoteId, editCallback, deleteCallback } : { quoteId: string, editCallback?: (e:MouseEvent<HTMLButtonElement>, item: TQuote) => void, deleteCallback?: (e:MouseEvent<HTMLButtonElement>, item: TQuote) => void }) {
    const quote = useAppSelector(state => selectQuotesById(state, quoteId));
    const handleEdit = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (editCallback) editCallback(e, quote);
    }
    const handleDelete = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (deleteCallback) deleteCallback(e, quote);
    }
    return !quote ? 
    <div>No quote found</div>
    :
    <div className="bg-body-tertiary list-item border border-2 box-shadow d-flex justify-content-between align-items-center">
                <div className="col">
                    <span>{quote.index}</span>
                </div>
                <div className="col">
                    <p className="text-emphasis">{quote.text}</p>
                    <span className="fw-light text-right">{quote.author}</span>
                </div>
                <div className="col">
                    <Link to={`/${quote.id}`} state={{...quote}}>Read <BsEye></BsEye></Link>
                    <button className="btn btn-primary" data-value="edit" onClick={handleEdit}>Edit <BsPencil></BsPencil></button>
                    <button className="btn btn-danger" data-value="delete" onClick={handleDelete}>Delete <BsTrash></BsTrash></button>
                </div>
            </div>


        
}

export default QuotePreview; 