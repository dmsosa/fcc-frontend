import { BsBookmarkCheck } from "react-icons/bs";
import Banner from "../components/Widgets/Banner";
import AuthorsArray from "../components/Author/AllAuthor";


export function Authors() {


    
    return <div className="container-fluid m-0 p-0">
        <Banner title="Amazing quotes" subtitle="Your place to grow"><BsBookmarkCheck></BsBookmarkCheck></Banner>
        <AuthorsArray></AuthorsArray>
    </div>
        
}


export default Authors; 