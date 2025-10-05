import { NavLink, useLocation } from "react-router-dom";
import {
  Building,
  Landmark,
  FileText,
  User,
  ClipboardCheck,
} from "lucide-react";

const sections = [
  { path: "/dashboard", label: "Foundation", icon: Building },
  { path: "/dashboard/financials", label: "Financials", icon: Landmark },
  {
    path: "/dashboard/credit-reports",
    label: "Business Credit",
    icon: FileText,
  },
  { path: "/dashboard/personal", label: "Personal", icon: User },
  {
    path: "/dashboard/application-process",
    label: "Application Process",
    icon: ClipboardCheck,
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200/80">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="px-4 mb-4">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Fundability
          </h3>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {sections.map((section) => {
            const isFoundation = section.path === '/dashboard';
            // El enlace de Foundation es especial, debe estar activo tanto para /dashboard como para /dashboard/foundation
            const isActive = isFoundation
              ? pathname === '/dashboard' || pathname.startsWith('/dashboard/foundation')
              : pathname.startsWith(section.path);

            return (
              <NavLink
                key={section.path}
                to={section.path}
                end={isFoundation}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon className="mr-3 h-5 w-5" />
                <span>{section.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}