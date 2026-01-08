import { selectQuotesById } from "../../store/quotesSlice/quotesSlice";
import { BsPencilSquare } from "react-icons/bs";
import { useAppSelector } from "../../store";
import { Container, Row } from "react-bootstrap";
import { BiSolidMessageError } from "react-icons/bi";
import { useParams } from "react-router";


export function SingleQuote() {
    const { id } = useParams();
    const quote = useAppSelector(s => selectQuotesById(s, id));

    
    return <Container>
            {quote ? 
            <Row>
                <div className="text-animated-wrapper">
                    <span className="fs-6">{`All quotes`}</span>
                    <h1>Amazing quotes</h1>
                    <span>quote number: {}</span>
                    <BsPencilSquare></BsPencilSquare>
                </div>
                <Row className="row">
                    <p>{quote.text}</p>
                    <h4>{quote.author}</h4>
                </Row>
                <Row className="row">
                    
                </Row>
            </Row>
            :
            <Row>
                <div className="text-animated-wrapper">
                    <span className="fs-6">{`All quotes`}</span>
                    <h1>Quote not found</h1>
                    <span>try again later</span>
                    <BiSolidMessageError></BiSolidMessageError>
                </div>
            </Row>}
        </Container>;      
}

export default SingleQuote; 