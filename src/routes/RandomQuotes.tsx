import { FaTumblr, FaTwitter } from "react-icons/fa";
import { indexChanged, indexDecreased, indexIncreased, useQuoteState, type TQuoteState } from "../store/quotesSlice/quotesSlice";
import { useEffect } from "react";
import { getQuotesThunk } from "../store/quotesSlice/thunks";
import store from "../store/store";
import AppPaginate from "../components/Widgets/Paginate/AppPaginate";


export function RandomQuotes() {
    const { quotes, quoteIndex, isLoading, error }: TQuoteState = useQuoteState();
    const dispatch = store.dispatch;
    const { q, a } = quotes.length > 0 ? quotes[quoteIndex] : {q: undefined, a: undefined};
    const twitterHref = q ? `https://twitter.com/intent/tweet?text=${`"${encodeURI(q)}" -${a}`}&hashtags=quotes,fccQuotes,quotesAPI` : '';
    const tumblrHref = q ? `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,fccQuotes,quotesAPI&caption=${encodeURI(a)}&content=${encodeURI(q)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button` : '';
 

    const handlePageChange = ({ selected } : { selected: number }) => {
        if (!quotes) return;
        dispatch(indexChanged({ selected }));
    }
    const handlePageClick = (clickEvent: {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
  }) => {
        if (!quotes) return;
        const { isBreak, isActive, isNext } = clickEvent;
        if (isBreak || isActive ) return;
        if (isNext) { 
            dispatch(indexIncreased()); 
        } else { 
            dispatch(indexDecreased()); 
        }
        
    }
    useEffect(() => {
        //dispatchAction, redux stat zu isLoading wechseln, isFehler ist falsch.
        //dispatchStopFetching
        dispatch(getQuotesThunk());
    }, []);

    return isLoading  ? 
        <div>Loading</div>
        :
        error ?
        <div>Error </div>
        :
        <section className="section d-flex justify-content-center align-items-center vh-100">
            <div id="quote-box" className="container-sm d-flex justify-content-center align-items-center flex-column box w-80 bg-body-secondary border border-width-2 box-shadow-1 px-4 py-3">
                {/* Texte */}
                <div className="row d-flex justify-content-center align-items-center flex-column">
                    <p id="text" className="h3 text-center">
                        {`" ${q}`}
                    </p>
                    <span id="author" className="h4 d-block text-right my-4 align-self-end">{`- ${a}.`}</span>
                    <span>{quoteIndex}</span>
                </div>
                {/* Knopfe */}
                <div className="row">
                    <AppPaginate pageCount={quotes.length} index={quoteIndex} handlePageChange={handlePageChange} handlePageClick={handlePageClick}></AppPaginate>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <a id="tweet-quote" className="twitter-share-button" target="_blank" href={twitterHref}><FaTwitter ></FaTwitter></a>
                        <a id="tumblr-quote" className="tumblr-share-button" target="_blank" href={tumblrHref}><FaTumblr></FaTumblr></a>
                    </div>
                </div>
            </div>
        </section>;
}

export default RandomQuotes; 