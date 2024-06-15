import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "./mainNav";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
}
