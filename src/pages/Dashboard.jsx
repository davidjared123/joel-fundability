import { useState } from "react";
import Foundation from "@/pages/fundability/Foundation";
import Financials from "@/pages/fundability/Financials";
import CreditReports from "@/pages/fundability/CreditReports";
import Personal from "@/pages/fundability/Personal";
import ApplicationProcess from "@/pages/fundability/ApplicationProcess";
import Navbar from "@/components/Navbar";

const sections = [
  { key: "foundation", label: "Foundation" },
  { key: "financials", label: "Financials" },
  { key: "creditReports", label: "Business Credit" },
  { key: "personal", label: "Personal" },
  { key: "application", label: "Application Process" },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("foundation");

  const renderSection = () => {
    switch (activeSection) {
      case "foundation":
        return <Foundation />;
      case "financials":
        return <Financials />;
      case "creditReports":
        return <CreditReports />;
      case "personal":
        return <Personal />;
      case "application":
        return <ApplicationProcess />;
      default:
        return <Foundation />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Submenu */}
      <div className="border-b border-gray-200 px-4 sm:px-8 py-4 bg-white shadow-sm">
        <div className="flex space-x-4 overflow-x-auto text-sm font-medium">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`py-2 px-3 border-b-2 transition-colors duration-200 ${
                activeSection === section.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 sm:p-6">{renderSection()}</main>
    </div>
  );
}
