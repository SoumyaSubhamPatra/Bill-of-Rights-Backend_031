import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // On component mount or theme change, update the body class
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    // Optionally, save theme preference to localStorage here
    // localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  };

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span className="toggle-icon">
        {isDarkTheme ? <FaMoon /> : <FaSun />}
      </span>
    </div>
  );
};

export default ThemeToggle;
