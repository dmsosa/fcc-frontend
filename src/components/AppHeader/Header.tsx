
import { Container, Nav, NavDropdown } from "react-bootstrap";
import  Navbar from "react-bootstrap/Navbar";

export default function Header () {
  return (
    <header id='header' className="header">
      <Navbar expand="lg" >
        <Container>
        <Navbar.Brand href="#home">F - FormaWeb S.L.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Contacto</Nav.Link>
            <Nav.Link href="#link">Mi cuenta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </header>
  );
}
