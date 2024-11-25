import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <h3>© Penny Pinchers</h3>
        <h6>*Photos displayed may not match actual product. ❤️</h6>
      </Container>
    </footer>
  );
};

export default Footer;
