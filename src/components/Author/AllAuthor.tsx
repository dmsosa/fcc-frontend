//Array von LS prufen. Wenn nicht gespeichert ist, dispatch fetchQuotes
//case fulfilled, state verandern auf Reducer
//listener wird es im Lokale Speichern setzen
import useArrayIds from "../../hooks/useArrayIds";
import { useAppSelector } from "../../store";
import { Row } from "react-bootstrap";
import AppPaginate from "../Widgets/Paginate/AppPaginate";

export function AuthorsArray() {

    const { status, error } = useAppSelector(s => s.authors);

    const { paginatedArray, arrayCount, offset, setOffset, filter, setFilter, rmFilter } = useArrayIds({serviceName: 'quotes', options: { filter: {}, filterKey: 'quotes-filter' }});
    // const [ targetItem, setTargetItem ] = useState<TAuthor | undefined>(undefined);
    // const [ showEditModal, setShowEditModal ] = useState<boolean>(false);
    // const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);


    
    // const dispatch = useAppDispatch();

    // //Handler fur Filter
    // const handleChangeFilter = (e: ChangeEvent<HTMLInputElement> ) => {
    //     const name = e.currentTarget.name;
    //     const value = e.currentTarget.value;
    //     setFilter((prev) => ({...prev, [name]: value}));
    // }
    // const handleClearFilter = () => {
    //     rmFilter();
    //     setFilter({});
    // }
    //Handler fur Pagination
    const handlePageChange = ({ selected } : { selected: number }) => {
        setOffset(selected);
    }

    // //Handlers fur Modals
    // const handleDeleteConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if (!targetItem) return;
    //     console.log(`removing quote with id: ${targetItem.id} after confirm`);
    //     dispatch(quoteRemoved({ id: targetItem.id }));
    //     setShowDeleteModal(false);
    // }

    // //Handler fur QuotePreview Elemente
    // const handleQuotePreviewClick = (e: MouseEvent<HTMLButtonElement>, item: TQuote) => {
    //     e.preventDefault();
    //     const modal = e.currentTarget.dataset.value;
    //         if (!item || !modal) return;
    //         setTargetItem(item);
    //     if (modal === 'edit') {
    //         setShowEditModal(true);
    //     } else {
    //         setShowDeleteModal(true);
    //     }
    // }


    return status === 'loading'  ? 
        <div>Loading</div>
        :
        status === 'failed' ?
        <div>Error: {error}</div>
        :
        <Row>
            <div aria-roledescription="array-container" className="mt-3">
                {
                    paginatedArray.length > 0 ? 
                    <>
                    { paginatedArray.map((id) => <div>{id}</div>) }
                    </>
                    :
                    <div>No authors found</div>
                }
                <AppPaginate pageCount={Math.ceil(arrayCount / 3)} index={offset} handlePageChange={handlePageChange}></AppPaginate>
            </div>
        </Row>;
        
}

export default AuthorsArray; 