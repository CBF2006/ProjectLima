"use client";

import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const shouldBeDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains("dark");
    html.classList.toggle("dark");
    setIsDark(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-accent transition"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};