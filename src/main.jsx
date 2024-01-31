import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Confirm from "./pages/confirm.jsx";
import Success from "./pages/success.jsx";
import Offline from "./pages/offline.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/admin.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/offline" element={<Offline />} />
        <Route path="/result" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </Router>
  </React.StrictMode>
);
