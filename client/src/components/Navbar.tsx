import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'py-2' : 'py-4'
    } bg-black bg-opacity-70 backdrop-blur-md`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <svg width="150" height="40" viewBox="0 0 400 100" className="text-foreground">
            <text x="10" y="70" className="font-adventure text-4xl fill-current">Piloto Inteligente</text>
            <circle cx="300" cy="40" r="20" className="fill-primary" />
            <path d="M300,30 L300,50" stroke="black" strokeWidth="2" />
            <path d="M290,40 L310,40" stroke="black" strokeWidth="2" />
          </svg>
        </Link>

        <div className={`md:flex gap-8 items-center ${mobileMenuOpen ? 'absolute inset-x-0 top-full flex flex-col items-start px-4 py-4 bg-black bg-opacity-90' : 'hidden'}`}>
          <Link to="/" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2 px-4 bg-[#F3B004] rounded-md">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/categoria/camisetas" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Camisetas
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/categoria/relogios" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Relógios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/categoria/bones" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Bonés
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/categoria/acessorios" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Acessórios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/categoria/agasalhos" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Agasalhos de Voo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/sobre" className="font-adventure text-sm uppercase tracking-wider hover:text-primary transition-colors relative group py-2">
            Nossa História
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-foreground hover:text-primary transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <Link to="/perfil" className="text-foreground hover:text-primary transition-colors" aria-label="Profile">
            <User size={20} />
          </Link>
          <Link to="/carrinho" className="text-foreground hover:text-primary transition-colors relative" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8B4513] text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;