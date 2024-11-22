import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { App } from "./webapp/app/App.tsx";
import { darken, hexToRgba } from "./utils/colors.ts";

declare module "@mui/material/styles" {
    interface Mixins {
        hexToRgba: (color: string, alpha: number) => string;
        darken: (color: string, coefficient: number) => string;
    }
}

const theme = createTheme({
    colorSchemes: {
        dark: true,
        light: false,
    },
    components: {},
    mixins: {
        hexToRgba: hexToRgba,
        darken: darken,
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
