import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { App } from "./webapp/app/App.tsx";
import AppTheme from "./webapp/theme/AppTheme.tsx";

// MUI v6 Dashboard Template

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <AppTheme>
                <CssBaseline enableColorScheme />
                <App />
            </AppTheme>
        </StyledEngineProvider>
    </React.StrictMode>
);
