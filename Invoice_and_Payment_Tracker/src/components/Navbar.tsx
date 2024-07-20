import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/Logos.png"; // Make sure to replace this with the actual path to your logo image
import "../styles/styles.css";

interface NavbarProps {
  toggleTheme: () => void;
  darkMode: boolean;
  onLogout: () => void; // Add onLogout prop
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, darkMode, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Payment Tracker Logo" className="logo-image" />
        <span>Payment Tracker</span>
      </div>
      <div className="navbar-actions">
        <div className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? (
            <FaSun className="toggle-icon" />
          ) : (
            <FaMoon className="toggle-icon" />
          )}
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
