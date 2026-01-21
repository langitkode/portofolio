import { Link, NavLink } from "react-router-dom";
import { Container } from "./ui";

export default function Header() {
  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-brand-text font-medium" : "hover:text-brand-text";

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
          <NavLink to="/" className={activeClass}>
            Manifesto
          </NavLink>
          <NavLink to="/logs" className={activeClass}>
            Logs
          </NavLink>
          <NavLink to="/systems" className={activeClass}>
            Systems
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
