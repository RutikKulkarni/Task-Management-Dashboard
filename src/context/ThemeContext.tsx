import React, { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "blue" | "green";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if a theme is stored in localStorage
  const savedTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme) || "light"
      : "light";

  const [theme, setTheme] = useState<Theme>(savedTheme);

  // Update document classes and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-blue",
      "theme-green"
    );

    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
