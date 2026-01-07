"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="rounded-lg p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" />
            ) : (
                <Moon className="h-5 w-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" />
            )}
        </button>
    );
}
