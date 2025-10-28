import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SubNavbar from "@/components/SubNavbar";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const isSettingsPage = pathname.startsWith('/dashboard/settings');

  return (
    <div className="h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      {!isSettingsPage && <SubNavbar />}
      <div className="flex flex-1 overflow-hidden">
        {!isSettingsPage && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
