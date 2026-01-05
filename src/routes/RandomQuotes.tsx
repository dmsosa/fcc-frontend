import AddQuotes from "../components/RandomQuotes/AddQuotes";
import AllQuotes from "../components/RandomQuotes/AllQuotes";


export function RandomQuotes() {


    
    return <div className="container">
        <div className="row">
            <h1>Find Inspiration</h1>
            <span>animated text</span>
        </div>
        <AddQuotes></AddQuotes>
        <AllQuotes></AllQuotes>
    </div>
        
}


export default RandomQuotes; 