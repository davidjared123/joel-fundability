import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/pages/Dashboard";
import Foundation from "@/pages/fundability/Foundation";
import Financials from "@/pages/fundability/Financials";
import CreditReports from "@/pages/fundability/CreditReports";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './services/supabaseClient';


export default function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas dentro del Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="foundation" element={<Foundation />} />
            <Route path="financials" element={<Financials />} />
            <Route path="credit-reports" element={<CreditReports />} />
          </Route>
        </Routes>
      </Router>
    </SessionContextProvider>
  );
}

