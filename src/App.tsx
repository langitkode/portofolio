import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "./components/ui";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import LogDetail from "./pages/LogDetail";
import Systems from "./pages/Systems";
import SystemDetail from "./pages/SystemDetail";

export default function App() {
  return (
    <>
      <Header />
      <main className="pb-24">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/logs/:slug" element={<LogDetail />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/systems/:slug" element={<SystemDetail />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}
