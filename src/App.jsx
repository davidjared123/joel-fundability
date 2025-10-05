import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas públicas
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import VerifyReset from "@/pages/VerifyReset";
import Vendors from "@/pages/Vendors";
import CreditOptions from "@/pages/CreditOptions";

// Contexto de autenticación
import { AuthProvider } from './context/AuthContext';

// Dashboard y rutas privadas
import DashboardLayout from "@/pages/Dashboard";
import Foundation from "@/pages/fundability/Foundation";
import BusinessName from "@/pages/fundability/foundation/BusinessName";
import EIN from "@/pages/fundability/foundation/EIN";
import BusinessAddress from "@/pages/fundability/foundation/BusinessAddress";
import WebsiteAndEmail from "@/pages/fundability/foundation/WebsiteAndEmail";
import Licenses from "@/pages/fundability/foundation/Licenses";
import Financials from "@/pages/fundability/Financials";
import CreditReports from "@/pages/fundability/CreditReports";
import Personal from "@/pages/fundability/Personal";
import ApplicationProcess from "@/pages/fundability/ApplicationProcess";
import Settings from "@/pages/Settings";
import PrivateRoute from "@/components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-reset" element={<VerifyReset />} />

          {/* Páginas independientes */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/credit-options" element={<CreditOptions />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Foundation />} />

              {/* Sub-rutas del Foundation */}
              <Route path="foundation" element={<Foundation />}>
                <Route index element={<BusinessName />} />
                <Route path="business-name-&-entity-setup" element={<BusinessName />} />
                <Route path="ein-registration" element={<EIN />} />
                <Route path="business-address-&-phone" element={<BusinessAddress />} />
                <Route path="website-&-email-domain" element={<WebsiteAndEmail />} />
                <Route path="licenses-&-permits" element={<Licenses />} />
              </Route>

              <Route path="financials" element={<Financials />} />
              <Route path="credit-reports" element={<CreditReports />} />
              <Route path="personal" element={<Personal />} />
              <Route path="application-process" element={<ApplicationProcess />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
