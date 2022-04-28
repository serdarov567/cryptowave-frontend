import React from "react";

import Landing from "./pages/Landing";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "./pages/Sign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign/:type" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
