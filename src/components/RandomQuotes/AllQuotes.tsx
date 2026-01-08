import QuotePreview from "./QuotePreview";
import { quoteRemoved, type TQuote } from "../../store/quotesSlice/quotesSlice";
import AppPaginate from "../Widgets/Paginate/AppPaginate";
import { Container, Row } from "react-bootstrap";
import { useState, type MouseEvent } from "react";
import ModalPortal from "../Widgets/Modal/ModalPortal";
import { useAppDispatch } from "../../store";
import useArrayIds from "../../hooks/useArrayIds";
import EditQuoteForm from "./QuoteEditForm";

//Persist data from LS
//1. lookup LS
//2. if found, set it as initialValue
//3. if not, set InitialValue
//4. Save changes to LS when actions are dispatched


//Idee fur modalen
//AllQuotes hat Edit und Delete Modal als Kind elemente > nur 1 Instance gerstellt
//Wir passen ein onConfirmCallback zu DeleteModal, es kann auch null sein
//QuoteCard setShow && setsCallback to dispatch(e, item)
//DeleteModal shows, with currentCallback als dispatch(e, item)
//OR deleteModal shows, with targetItem als item, cllback will check and dispatch
//Wir setzen ein targetItem in der parentElemente, und dispatchDelete OR dispatchEdit(e)
export type TModalConfig<T = unknown> = {
    targetItem?: T,
    showEditModal: boolean, 
    showDeleteModal: boolean
}
//Idee: Edit & Delete Modalen sind durch React.createPortal() gerstellt.
//Falls show === falsch ---> zeigen kein Modal
//Die Aktionen, die die Modalen ausfuhren werden sind bei Parent Komponente AllQuotes() definiert.
//Die vorgegebenen aktionen mit den aktuells targetItem verbunden sind
//QuotesPreview hat der funktion an, die targetItem und showModal zu setzen
//die ConfirnmModal
export function AllQuotes() {

    const { array, arrayCount, status, error, offset, setOffset } = useArrayIds({serviceName: 'quotes' });
    const [ targetItem, setTargetItem ] = useState<TQuote | undefined>(undefined);
    const [ showEditModal, setShowEditModal ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    console.log(array)
    const handlePageChange = ({ selected } : { selected: number }) => {
        setOffset(selected);
    }

    const handleDeleteConfirm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetItem) return;
        console.log(`removing quote with id: ${targetItem.id} after confirm`);
        dispatch(quoteRemoved({ id: targetItem.id }));
        setShowDeleteModal(false);
    }
    const handleModalCancel = (modal: "edit" | "delete") => {
        if (modal === 'edit') {
            console.log(`Hey, Du hast das quote mit id: ${targetItem!.id} noch nicht geandert!`);
            setShowEditModal(true);
        } else {
            console.log(`Buff! man hast das quote mit id: ${targetItem!.id} fast entfernen!`);
            setShowDeleteModal(true);
        }
    }

    //Fur QuotePreview Elemente
    const quotePreviewCallback = (e: MouseEvent<HTMLButtonElement>, item: TQuote) => {
        e.preventDefault();
        const modal = e.currentTarget.dataset.value;
        if (!item || !modal) return;
        setTargetItem(item);
        if (modal === 'edit') {
            setShowEditModal(true);
        } else {
            setShowDeleteModal(true);
        }
    }

    return status === 'loading'  ? 
        <div>Loading</div>
        :
        status === 'failed' ?
        <div>Error: {error}</div>
        :
        <Container className="row">
            <Row>
                {array.map((id) => <QuotePreview quoteId={id} deleteCallback={quotePreviewCallback} editCallback={quotePreviewCallback}></QuotePreview>)}
            </Row>
            <Row>
                <AppPaginate pageCount={Math.ceil(arrayCount / 3)} index={offset} handlePageChange={handlePageChange}></AppPaginate>
            </Row>
            <ModalPortal title={'are you sure to delete quote?'} subtitle="this action can not be undone!" show={showDeleteModal} setShow={setShowDeleteModal}>
                <div>
                    <p className="fw-bold text-left">The quote has the following content:</p>
                    {targetItem && <p className="fw-light text-center w-80 mx-auto">{targetItem.text}</p>}
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes</button>
                        <button className="btn btn-primary" onClick={() => handleModalCancel('delete')}>No</button>
                    </div>
                </div>
            </ModalPortal>
            <ModalPortal title={'Edit quote'} show={showEditModal} setShow={setShowEditModal}>
                <EditQuoteForm quote={targetItem!} onClose={() => handleModalCancel('edit')}></EditQuoteForm>
            </ModalPortal>
        </Container>;
        
}

export default AllQuotes; 