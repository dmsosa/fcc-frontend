import { Container, Row } from "react-bootstrap";
import ContactUsForm from "../components/Form/EssenForm/EssenForm";


export default function Home () {
    
    return (
        <>
        <section id="hero-section" className="section bgPri">
            <Container>
                <Row>
                    <ContactUsForm></ContactUsForm>
                </Row>
            </Container>
        </section>
        </>
  );
}

