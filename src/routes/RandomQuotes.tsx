import { useEffect, useState } from "react";
import { FaTumblr, FaTwitter } from "react-icons/fa";
import { getQuoteArray, type TQuote } from "../service/quoteService";
import type { AxiosError } from "axios";

type TQuoteState = {
    quoteArray: TQuote[] | undefined,
    quoteIndex: number,
}
function RandomQuotes() {
    const [ { quoteArray, quoteIndex}, setQuoteState ] = useState<TQuoteState>({ quoteArray: undefined, quoteIndex: 0 });
    const [ status, setStatus ] = useState('loading');
    const { q, a } = quoteArray ? quoteArray[quoteIndex] : {q: undefined, a: undefined};
    const twitterHref = q ? `https://twitter.com/intent/tweet?text=${`"${encodeURI(q)}" -${a}`}&hashtags=quotes,fccQuotes,quotesAPI` : '';
    const tumblrHref = q ? `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,fccQuotes,quotesAPI&caption=${encodeURI(a)}&content=${encodeURI(q)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button` : '';
    useEffect(() => {

        setStatus('loading');

        getQuoteArray().then((data: TQuote[]) => {
            const randIndex = Math.floor(Math.random() * (data.length));
            setQuoteState({quoteArray: data, quoteIndex: randIndex });
            setStatus('fulfilled');
        })
        .catch((error: AxiosError) => {
            console.log(error);
            setStatus('error');
        })
    }, [])

    const handleNewQuote = () => {
        if (!quoteArray) return;
        setQuoteState((prevState) => {
            const prevIndex = prevState.quoteIndex;
            let nextIndex;
            if (prevIndex === quoteArray.length) {
                nextIndex = 0;
            } else {
                nextIndex = prevIndex + 1;
            }
            return ({...prevState, quoteIndex:  nextIndex})
        });
        // changeTheme(setTheme);
    }

    return status === 'loading' ? 
        <div>Loading</div>
        :
        status === 'error' ?
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
                </div>
                {/* Knopfe */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <a id="tweet-quote" className="twitter-share-button" target="_blank" href={twitterHref}><FaTwitter ></FaTwitter></a>
                        <a id="tumblr-quote" className="tumblr-share-button" target="_blank" href={tumblrHref}><FaTumblr></FaTumblr></a>
                    </div>
                    <button id="new-quote" className="btn btn-primary border-radius-0" onClick={handleNewQuote}>New quote</button>
                </div>
            </div>
        </section>;
}

export default RandomQuotes; 