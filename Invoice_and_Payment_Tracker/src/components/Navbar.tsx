import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
// import "./style.css";

interface NavbarProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <div className="navbar-actions">
        <div className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? (
            <FaSun className="toggle-icon" />
          ) : (
            <FaMoon className="toggle-icon" />
          )}
        </div>
        <a href="/login" className="login-link">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
