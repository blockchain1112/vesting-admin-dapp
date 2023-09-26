import React from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../assets/css/index.css";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
    const themeConfig = {
        typography: {
            fontFamily: "'Proxima Nova Rg', sans-serif",
            fontSize: 14,
            primary: {
                // light: "white",
                // main: "white"
            }
        },
        palette: {
            mode: 'dark',
            // primary: {
            //     light: "#ffffff",
            //     main: "#ffffff"
            // }
        }
    };
    const theme = createTheme(themeConfig);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
export default MaterialThemeProvider;