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

function App() {
  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;

  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init(
        {
          appId: "580b6e9c-4b5e-4181-b66d-b5b199f81b70",
          promptOptions: {
            slidedown: {
              enabled: true,
              actionMessage:
                "We'd like to show you notifications for the latest news and updates about out website.",
              acceptButtonText: "Agree!",
              cancelButtonText: "No, thanks!",
              categories: {
                tags: [
                  {
                    tag: "news",
                    label: "News and updates",
                  },
                ],
              },
            },
          },
          welcomeNotification: {
            title: "Cryptowave",
            message: "Thank you for subscribing!",
          },
        },
        //Automatically subscribe to the new_app_version tag
        OneSignal.sendTag("new_app_version", "new_app_version", (tagsSent) => {
          // Callback called when tag has finished sending
          console.log("new_app_version TAG SENT", tagsSent);
        })
      );
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
