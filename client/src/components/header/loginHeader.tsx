import pennies from "../../assets/images/pennies.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <>
      <header className="heaeder">
        <Navbar
          bg="dark"
          variant="dark"
          expand="md"
          className="border-bottom mb-4"
          sticky="top"
        >
          <Container>
            <Navbar.Brand href="/">
              <img src={pennies} className="me-2" width="79" height="45" />
            </Navbar.Brand>
            <Navbar.Brand href="/">
              <h1 className="display-6 ms-4">Penny Pinchers</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/checkout">
                  <Nav.Link>Checkout</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
