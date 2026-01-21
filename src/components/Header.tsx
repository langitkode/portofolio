import { Link } from "@tanstack/react-router";
import { Container } from "./ui";

export default function Header() {
  return (
    <header className="py-12">
      <Container className="flex justify-between items-baseline">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tighter hover:opacity-70 transition-opacity"
        >
          PSE LAB
        </Link>
        <nav className="flex gap-6 text-sm text-brand-muted">
          <Link
            to="/"
            className="[&.active]:text-brand-text [&.active]:font-medium hover:text-brand-text"
          >
            Manifesto
          </Link>
          <Link
            to="/logs"
            className="[&.active]:text-brand-text [&.active]:font-medium hover:text-brand-text"
          >
            Logs
          </Link>
          <Link
            to="/systems"
            className="[&.active]:text-brand-text [&.active]:font-medium hover:text-brand-text"
          >
            Systems
          </Link>
        </nav>
      </Container>
    </header>
  );
}
