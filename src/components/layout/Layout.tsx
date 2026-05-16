import { Outlet, Link } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {

  return (
    <div className="min-h-screen bg-blue-50/50">
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="text-indigo-600 font-black text-2xl tracking-tighter">
            KalladNu
          </Link>

          <Navigation />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;