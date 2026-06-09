import { type TQuote } from "../../store/quotesSlice/quotesSlice";
import { useState, type ChangeEvent } from "react";

import { BsX } from "react-icons/bs";

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

const initForm: Partial<TQuote> = {text: '', author: '', id: '', likes: 0 };
export function FilterQuotes({ filter, handleChangeFilter, handleClearFilter }: { filter: Partial<TQuote>, handleChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void, handleClearFilter: () => void}) {

    const [{ text, author, id, likes }, setFilterForm ]  = useState(filter ?? initForm);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeFilter(e);
    }
    const handleClear = () => {
        setFilterForm(initForm);
        handleClearFilter();
    }
    
    return <div>
            <fieldset>
                <label htmlFor="quote-filter-text">text</label>
                <input type="text" name="text" id="quote-filter-text" value={text} onChange={handleChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="quote-filter-author">author</label>
                <input type="text" name="author" id="quote-filter-author" value={author} onChange={handleChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="quote-filter-id">id</label>
                <input type="text" name="text" id="quote-filter-id" value={id} onChange={handleChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="quote-filter-likes">likes</label>
                <input type="number" name="likes" id="quote-filter-likes" value={likes} onChange={handleChange}/>
            </fieldset>
            <button className="btn btn-danger" onClick={handleClear}><BsX></BsX></button>
        </div>;
        
}

export default FilterQuotes; 