import React, { useEffect } from "react";
import Landing from "src/pages/Landing/Landing";
import "src/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "src/pages/Sign";
import Dashboard from "src/pages/Dashboard/Dashboard";
import Wallets from "src/pages/Wallets";
import PlanHistory from "src/pages/Dashboard/PlanHistory";
import Admin from "src/pages/Admin";
import NotFound from "src/pages/NotFound";
import TermsAndConditions from "./pages/TermsAndCondiitons";
import Withdraw from "./pages/Dashboard/Withdraw";
import OneSignal from "react-onesignal";

function App() {
  useEffect(() => {
    OneSignal.init({
      appId: "580b6e9c-4b5e-4181-b66d-b5b199f81b70",
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign/:type" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/planhistory" element={<PlanHistory />} />
        <Route path="/dashboard/withdraw" element={<Withdraw />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/bestadminever" element={<Admin />} />
        <Route path={"/termsandconditions"} element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
