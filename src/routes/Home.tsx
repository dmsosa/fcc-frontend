import { Container, Row } from "react-bootstrap";
import ContactUsForm from "../components/Form/ContactUsForm";


export default function Home () {
    
    return (
        <>
        <section id="hero-section" className="app-section">
            <Container>
                <Row>
                    <ContactUsForm></ContactUsForm>
                </Row>
            </Container>
        </section>
        </>
  );
}

