import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const sections = [
  { path: "foundation", label: "Foundation" },
  { path: "financials", label: "Financials" },
  { path: "credit-reports", label: "Business Credit" },
  { path: "personal", label: "Personal" },
  { path: "application-process", label: "Application Process" },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const isSettingsPage = pathname === '/dashboard/settings';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Submenu */}
      {!isSettingsPage && (
        <div className="border-b border-gray-200 px-4 sm:px-8 py-4 bg-white shadow-sm">
          <div className="flex space-x-4 overflow-x-auto text-sm font-medium">
            {sections.map((section) => {
              const isFoundation = section.path === 'foundation';
              const isDashboardHome = pathname === '/dashboard';
              
              return (
                <NavLink
                  key={section.path}
                  to={section.path}
                  className={({ isActive }) => {
                    const active = (isFoundation && isDashboardHome) || isActive;
                    return `py-2 px-3 border-b-2 transition-colors duration-200 ${
                      active
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-blue-500"
                    }`;
                  }}
                >
                  {section.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Renderiza la sección activa */}
      <main className={isSettingsPage ? "" : "p-4 sm:p-6"}>
        <Outlet />
      </main>
    </div>
  );
}
