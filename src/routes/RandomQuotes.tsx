import { FaTumblr, FaTwitter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { incrementIndex, selectQuoteState, type TQuoteState } from "../store/quotesSlice/quotesSlice";


export function RandomQuotes() {
    const { quotes, quoteIndex, amount, isLoading, error }: TQuoteState = selectQuoteState();
    const dispatch = useDispatch();
    const { q, a } = quotes.length > 0 ? quotes[quoteIndex] : {q: undefined, a: undefined};
    const twitterHref = q ? `https://twitter.com/intent/tweet?text=${`"${encodeURI(q)}" -${a}`}&hashtags=quotes,fccQuotes,quotesAPI` : '';
    const tumblrHref = q ? `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,fccQuotes,quotesAPI&caption=${encodeURI(a)}&content=${encodeURI(q)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button` : '';
    
    const handleNewQuote = () => {
        if (!quotes) return;
        dispatch(incrementIndex({ amount }));
        // changeTheme(setTheme);
    }

    return isLoading  ? 
        <div>Loading</div>
        :
        error ?
        <div>Error </div>
        :
        <section className="d-flex justify-content-center align-items-center vh-100">
            <div id="quote-box" className="container-sm bg-2 border border-width-1 box-shadow-1 px-4 py-3">
                {/* Texte */}
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <p id="text" className="h3 text-center">
                        {`" ${q}`}
                    </p>
                    <span id="author" className="h4 d-block text-right my-4 align-self-end">{`- ${a}.`}</span>
                    <span>{quoteIndex}</span>
                </div>
                {/* Knopfe */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <a id="tweet-quote" className="twitter-share-button" target="_blank" href={twitterHref}><FaTwitter ></FaTwitter></a>
                        <a id="tumblr-quote" className="tumblr-share-button" target="_blank" href={tumblrHref}><FaTumblr></FaTumblr></a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button id="new-quote" className="btn btn-primary border-radius-0" onClick={handleNewQuote}>New quote</button>
                        <input type="number" name="amount" value={amount}/>
                        <button id="new-quote" className="btn btn-primary border-radius-0" onClick={handleNewQuote}>New quote</button>
                    </div>    
                    
                </div>
            </div>
        </section>;
}

export default RandomQuotes; 