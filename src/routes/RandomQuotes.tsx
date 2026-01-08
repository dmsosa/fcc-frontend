import { BsBookmarkCheck } from "react-icons/bs";
import AddQuotes from "../components/RandomQuotes/AddQuotes";
import AllQuotes from "../components/RandomQuotes/AllQuotes";
import Banner from "../components/Widgets/Banner";


export function RandomQuotes() {


    
    return <div className="container">
        <Banner title="Amazing quotes" subtitle="Your place to grow"><BsBookmarkCheck></BsBookmarkCheck></Banner>
        <AddQuotes></AddQuotes>
        <AllQuotes></AllQuotes>
    </div>
        
}


export default RandomQuotes; 