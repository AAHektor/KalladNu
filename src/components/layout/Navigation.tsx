import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Mail, 
  Send, 
  UserCircle 
} from "lucide-react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Mail size={20} />, label: 'Invitations', path: '/invitations' },
    { icon: <Send size={20} />, label: 'Sent', path: '/sent' },
    { icon: <UserCircle size={20} />, label: 'Profile', path: '/profile' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      {/* --- NAVIGATION --- */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="text-indigo-600 font-black text-2xl tracking-tighter">
            KalladNu
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 font-bold text-sm transition-colors ${
                  location.pathname === item.path ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger Button (Mobile) */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-[55] bg-indigo-900/95 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        md:hidden
      `}>
        <nav className="flex flex-col gap-8 text-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 text-2xl font-bold transition-colors ${
                location.pathname === item.path ? 'text-white' : 'text-indigo-300 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;