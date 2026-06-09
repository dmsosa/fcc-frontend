import { Link } from "react-router";
import {  selectQuotesById, type TQuote } from "../../store/quotesSlice/quotesSlice";
import type { MouseEvent } from "react";
import { useAppSelector } from "../../store";
import { BsEye, BsPencil, BsQuote, BsTrash } from "react-icons/bs";
import { ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";



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

    return quote ? 
    <div className="bg-body-tertiary list-item-vertical border border-2 box-shadow d-flex flex-column justify-content-between align-items-center w-sm-75 mx-auto">
            <div className="d-flex justify-content-between align-items-center gap-2 py-2">
                <span className="p-2 border-end border-2 fw-bold">{quote.index}</span>
                <div>
                    <span className="d-inline-block text-start"><BsQuote></BsQuote></span>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{quote.text}</Tooltip>}>
                        <p className="fst-italic mb-0 mt-1 ps-1 text-break">{quote.text}</p>
                    </OverlayTrigger>
                    <span className="d-block rotate-180 px-2"><BsQuote></BsQuote></span>
                    <hr className="m-0"/>
                    <span className="fw-light text-right d-block mt-3">{quote.author}</span>
                </div>    
            </div>
            <ButtonGroup className="gap-2 px-2 align-self-end">
                <Link to={`${quote.id}`} state={{...quote}} className="icon-link collapsable-link"><span>Read</span><BsEye></BsEye></Link>
                <button className="btn btn-primary collapsable-link" data-value="edit" onClick={handleEdit}><span className="me-2">Edit</span><BsPencil></BsPencil></button>
                <button className="btn btn-danger collapsable-link" data-value="delete" onClick={handleDelete}><span className="me-2">Delete</span><BsTrash></BsTrash></button>
            </ButtonGroup>
    </div>
    : null


        
}

export default QuotePreview; 