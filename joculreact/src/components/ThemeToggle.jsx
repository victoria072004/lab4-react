import React from "react";

const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
    >
      {isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  );
};

export default ThemeToggle;
