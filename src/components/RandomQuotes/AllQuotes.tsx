import QuotePreview from "./QuotePreview";
import { quoteRemoved, type TQuote } from "../../store/quotesSlice/quotesSlice";
import AppPaginate from "../Widgets/Paginate/AppPaginate";
import { Row } from "react-bootstrap";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import ModalPortal from "../Widgets/Modal/ModalPortal";
import { useAppDispatch, useAppSelector } from "../../store";
import useArrayIds from "../../hooks/useArrayIds";
import EditQuoteForm from "./QuoteEditForm";
import FilterQuotes from "./FilterQuotes";

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
//Ich mochtet es automatisieren, aber es ist zu komplex seien, weil TypeScript assumes this will be the erste Typ von mein Selector
//Der task, die ich automatisieren wollte:
//1. Nachem ServiceName, Ich mochte der entsprechende State From Slices mit useSelector greifen um Status und Error greifen (sind in beiden Staten present)
//2. Array mit entityAdapter.selectAll() greifen, es kann ein TQuotes[] oder TTodos[] seien.
//3. Array filtrieren mit filter logik
//4. Array paginieren mit offset logik
//5. der hook die settters zuruckgibt, um wieder neue Konfiguration zu ermoglichen. 

//Beispiel Usage:
export function AllQuotes() {

    const { status, error } = useAppSelector(s => s.quotes);

    const { paginatedArray, arrayCount, offset, setOffset, filter, setFilter, rmFilter } = useArrayIds({serviceName: 'quotes', options: { filter: {}, filterKey: 'quotes-filter' }});
    const [ targetItem, setTargetItem ] = useState<TQuote | undefined>(undefined);
    const [ showEditModal, setShowEditModal ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);


    
    const dispatch = useAppDispatch();

    //Handler fur Filter
    const handleChangeFilter = (e: ChangeEvent<HTMLInputElement> ) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter((prev) => ({...prev, [name]: value}));
    }
    const handleClearFilter = () => {
        rmFilter();
        setFilter({});
    }
    //Handler fur Pagination
    const handlePageChange = ({ selected } : { selected: number }) => {
        setOffset(selected);
    }

    //Handlers fur Modals
    const handleDeleteConfirm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetItem) return;
        console.log(`removing quote with id: ${targetItem.id} after confirm`);
        dispatch(quoteRemoved({ id: targetItem.id }));
        setShowDeleteModal(false);
    }

    //Handler fur QuotePreview Elemente
    const handleQuotePreviewClick = (e: MouseEvent<HTMLButtonElement>, item: TQuote) => {
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
        <Row>
            <div aria-roledescription="array-container" className="mt-3">
                <FilterQuotes filter={filter} handleChangeFilter={handleChangeFilter} handleClearFilter={handleClearFilter}></FilterQuotes>
                {
                    paginatedArray.length > 0 ? 
                    <>
                    { paginatedArray.map((id) => <QuotePreview quoteId={id} deleteCallback={handleQuotePreviewClick}     editCallback={handleQuotePreviewClick}></QuotePreview>) }
                    </>
                    :
                    <div>No quotes found</div>
                }
                <AppPaginate pageCount={Math.ceil(arrayCount / 3)} index={offset} handlePageChange={handlePageChange}></AppPaginate>
            </div>
            {/* DeleteModal */}
            <ModalPortal title={'are you sure to delete quote?'} subtitle="this action can not be undone!" show={showDeleteModal} setShow={setShowDeleteModal}>
                <div>
                    <p className="fw-bold text-left">The quote has the following content:</p>
                    {targetItem && <p className="fw-light text-center w-80 mx-auto">{targetItem.text}</p>}
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes</button>
                        <button className="btn btn-primary" onClick={() => setShowDeleteModal(false)}>No</button>
                    </div>
                </div>
            </ModalPortal>
            {/* EditModal */}
            <ModalPortal title={'Edit quote'} show={showEditModal} setShow={setShowEditModal}>
                <EditQuoteForm quote={targetItem!} onClose={() => setShowEditModal(false)}></EditQuoteForm>
            </ModalPortal>
        </Row>;
        
}

export default AllQuotes; 