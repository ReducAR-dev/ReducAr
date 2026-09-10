// components/common/Navbar.tsx
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

interface NavbarProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void; // para cerrar el menú en móvil
}

export const Navbar = ({ items, className = "", onItemClick }: NavbarProps) => {
  return (
    <nav className={`home-nav ${className}`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="home-nav-link"
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;