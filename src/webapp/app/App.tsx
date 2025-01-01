import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { AppContext, AppContextState } from "./context";
import { useConnections } from "../hooks/useConnections";
import { getCompositionRoot } from "../../CompositionRoot";
import { SideMenuDesktop } from "../components/layout/SideMenuDesktop";
import { AppNavbarMobile } from "../components/layout/AppNavbarMobile";
import { AppRouter as MainContent } from "../pages/Router";
import { SnackbarProvider } from "../components/snackbar/snackbar";

export const App = () => {
    const connections = useConnections();

    const appContext: AppContextState = {
        compositionRoot: getCompositionRoot(),
        connections: connections,
    };

    return (
        <AppContext.Provider value={appContext}>
            <SnackbarProvider>
                <BrowserRouter>
                    <Box display="flex">
                        <SideMenuDesktop />
                        <AppNavbarMobile />
                        <MainContent />
                    </Box>
                </BrowserRouter>
            </SnackbarProvider>
        </AppContext.Provider>
    );
};
