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

export default function SubNavbar() {
  const { pathname } = useLocation();

  return (
    <div className="md:hidden bg-white border-b border-gray-200/80">
      <div className="px-4">
        <h3 className="px-2 pt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Fundability
        </h3>
      </div>
      <nav className="flex overflow-x-auto space-x-1 p-2">
        {sections.map((section) => {
          const isFoundation = section.path === '/dashboard';
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
  );
}
