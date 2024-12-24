import React from "react";
import { alpha, Box, useTheme } from "@mui/material";
import { AppContext, AppContextState } from "./context";
import { useConnections } from "../hooks/useConnections";
import { getCompositionRoot } from "../../CompositionRoot";
import { Stack } from "../components/stack/Stack";
import SideMenu from "../template/SideMenu";
import _AppNavbar from "../template/AppNavbar";
import Header from "../template/Header";
import MainGrid from "../template/MainGrid";

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
                {/* Mobile: <AppNavbar /> */}
                {
                    /* Main content */
                    // <TemplateDashboard />
                }
            </Box>
        </AppContext.Provider>
    );
});

const _TemplateDashboard = () => {
    const theme = useTheme();
    return (
        <Box component="main" flexGrow={1} bgcolor={alpha(theme.palette.background.default, 1)}>
            <Stack alignItems="center" marginX={3} paddingBottom={5} marginTop={{ xs: 8, md: 0 }} gap={2}>
                <Header />
                <MainGrid />
            </Stack>
        </Box>
    );
};
