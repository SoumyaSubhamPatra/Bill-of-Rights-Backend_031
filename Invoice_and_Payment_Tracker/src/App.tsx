import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import Customer from "./components/Customer";
import SystemUsers from "./components/SystemUsers";
import "./styles/styles.css";
import InvoiceForm from "./components/InvoiceForm";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark-theme" : ""}>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<InvoiceForm />} />
            <Route path="/product" element={<Product />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/system-users" element={<SystemUsers />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
