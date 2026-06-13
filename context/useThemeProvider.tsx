"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    //On commence par un état 'null' ou temporaire pour éviter le conflit au premier rendu
    const [isDark, setIsDark] = useState<boolean | null>(null);

    //Un SEUL useEffect pour initialiser le thème au montage du composant
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, []);

    //useEffect ne s'exécute QUE lorsque 'isDark' change REÉLLEMENT (après l'initialisation)
    useEffect(() => {
        if (isDark === null) return;

        const theme = isDark ? "dark" : "light";
        localStorage.setItem("theme", theme);

        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const toggle = () => setIsDark(prev => !prev);

    // Éviter le flash blanc pendant que Next.js s'initialise sur le client
    if (isDark === null) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider
            value={{
                isDark,
                toggle
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}