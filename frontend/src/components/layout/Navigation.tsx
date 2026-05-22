import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Mail,
  Send,
  UserCircle,
  LogOut,
  BadgeCheck
} from "lucide-react";
import { clearAuth, getStoredAuthUser, isAuthenticated } from "../../services/auth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = getStoredAuthUser();
  const authenticated = isAuthenticated();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Mail size={20} />, label: 'Invitations', path: '/invitations' },
    { icon: <Send size={20} />, label: 'Sent', path: '/sentInvitations' },
    { icon: <UserCircle size={20} />, label: 'Profile', path: '/profile' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    clearAuth();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <div>
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-4">
          <Link to="/dashboard" className="text-indigo-600 font-black text-2xl tracking-tighter">
            KalladNu
          </Link>

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

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm">
              <BadgeCheck size={16} className={authenticated ? 'text-emerald-500' : 'text-gray-400'} />
              <span className="text-gray-600">
                {authenticated ? `Inloggad${authUser?.name ? ` som ${authUser.name}` : ''}` : 'Inte inloggad'}
              </span>
            </div>

            {authenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
              >
                <LogOut size={16} />
                Logga ut
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Logga in
              </Link>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

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

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-white/90">
            <p className="text-sm font-semibold">
              {authenticated ? `Inloggad${authUser?.name ? ` som ${authUser.name}` : ''}` : 'Inte inloggad'}
            </p>
            {authenticated ? (
              <button
                onClick={handleLogout}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700"
              >
                <LogOut size={16} />
                Logga ut
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700"
              >
                Logga in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
