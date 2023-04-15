import { ReactNode, useEffect, useState } from "react";

import ThemeContext from "../app/contexts/theme";
import Theme from "../app/types/enums/theme";

interface WrapperProps {
    children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    const [theme, setTheme] = useState<Theme | null>(Theme.LIGHT);

    useEffect(() => {
        const root = document.querySelector("html")!;
        if (theme === Theme.DARK) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {theme != null && children}
        </ThemeContext.Provider>
    );
}
