// src/components/common/Navbar.tsx
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

interface NavbarProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

export const Navbar = ({ items, className = "", onItemClick }: NavbarProps) => {
  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-reducar-text-secondary hover:bg-reducar-surface-hover hover:text-reducar-primary transition-colors"
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;