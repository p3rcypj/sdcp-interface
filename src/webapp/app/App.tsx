import React from "react";
import { Box } from "@mui/material";
import { AppContext, AppContextState } from "./context";
import { useConnections } from "../hooks/useConnections";
import { getCompositionRoot } from "../../CompositionRoot";
import SideMenu from "../template/SideMenu";
import AppNavbar from "../template/AppNavbar";
import AppRouter from "../pages/Router";

export const App = React.memo(() => {
    const connections = useConnections();

    const appContext: AppContextState = {
        compositionRoot: getCompositionRoot(),
        connections: connections,
    };

    return (
        <AppContext.Provider value={appContext}>
            <Box display="flex">
                <SideMenu />
                <AppNavbar />
                <AppRouter />
            </Box>
        </AppContext.Provider>
    );
});
