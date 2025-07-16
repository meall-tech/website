import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("astro:after-swap", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("astro:after-swap", handleStorageChange);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="light/dark mode toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}