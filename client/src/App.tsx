import { Container } from "react-bootstrap";
import LoginHeader from "./components/header/header";
import Header from "./components/header/loginHeader";
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Header />
        <LoginHeader />
        <Container>
          <main>
            <Outlet /> {/* This will render child routes like Login */}
          </main>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default App;
