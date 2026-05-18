import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {

  return (
    <div className="min-h-screen bg-blue-50/50">
      
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;