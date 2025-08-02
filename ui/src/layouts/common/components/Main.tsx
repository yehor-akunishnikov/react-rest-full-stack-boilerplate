import { Container } from "react-bootstrap";
import { Outlet } from "react-router";

export default function Main() {
  return (
    <main className="flex-grow-1">
      <Container fluid>
        <Outlet />
      </Container>
    </main>
  );
}
