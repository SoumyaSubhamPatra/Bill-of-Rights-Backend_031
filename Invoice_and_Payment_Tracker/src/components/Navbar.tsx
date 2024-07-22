// src/components/Navbar.tsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
// import { Avatar, Box } from "@chakra-ui/react"; // Assuming Chakra UI for styling
import logo from "../assets/Logos.png";
import "../styles/styles.css";

interface NavbarProps {
  toggleTheme: () => void;
  darkMode: boolean;
  onLogout: () => void;
  username: string; // Add username prop
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, darkMode, onLogout, username }) => {
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
        {/* <div className="user-info">
          <Avatar name={username} size="sm" className="user-avatar" />
          <span className="username">{username}</span>
        </div> */}
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
