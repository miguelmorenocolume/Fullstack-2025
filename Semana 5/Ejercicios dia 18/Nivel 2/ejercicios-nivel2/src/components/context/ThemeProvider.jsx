import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));


    useEffect(() => {
        document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#1a1a1a';
        document.body.style.color = theme === 'light' ? '#000000' : '#ffffff';
        document.body.style.transition = 'all 0.3s ease';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
