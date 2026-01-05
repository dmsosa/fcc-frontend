import { Link } from "react-router";
import {  type TQuote } from "../../store/quotesSlice/quotesSlice";
import { useDispatch } from "react-redux";



export function QuotePreview({ quote } : { quote: TQuote }) {
    const {  id, index, text, author, } = quote;
    const dispatch = useDispatch();
    const handleClick = () => {
        console.log(dispatch)
    }
    return <div className="row bg-body-tertiary list-item">
                <div className="col">
                    {index}
                </div>
                <div className="col">
                    <p>{text}</p>
                    <span>{author}</span>
                </div>
                <div className="col">
                    <Link to={`/${id}`} state={{...quote}}>See</Link>
                    <div className="btn btn-primary" onClick={handleClick}>Favorite</div>
                </div>
            </div>


        
}

export default QuotePreview; 