import pennies from "../../assets/images/pennies.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Authservice from "../../utils/auth";
import { FaShoppingCart } from "react-icons/fa";

const loginHeader = () => {
  const logout = () => {
    Authservice.logout();
  };

  const loggedIn = Authservice.loggedIn();

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
            {loggedIn ? (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to="/">
                    <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/checkout">
                    <Nav.Link>Checkout</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <FaShoppingCart size={20} />
                    </Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            ) : (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link>products</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default loginHeader;
