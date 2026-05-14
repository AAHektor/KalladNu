import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="">
            <header className="px-4 py-3 bg-blue-100">
                <div className="">
                    <h1 className="text-blue-800 font-semibold text-xl">Kallad.nu</h1>
                </div>
            </header>
            <main className="px-6 py-4 bg-blue-50/80 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
