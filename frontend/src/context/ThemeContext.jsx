import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return localStorage.getItem("darkMode") === "true" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
    localStorage.setItem("darkMode", theme === "dark");
  }, [theme]);

  const value = useMemo(() => {
    const isDarkMode = theme === "dark";

    return {
      theme,
      isDarkMode,
      setTheme,
      toggleTheme: () => setTheme((currentTheme) =>
        currentTheme === "dark" ? "light" : "dark"
      ),
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
