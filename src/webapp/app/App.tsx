import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AppContext, AppContextState } from "./context";
import { darkgrey } from "../../utils/colors";
import { useConnections } from "../hooks/useConnections";
import { getCompositionRoot } from "../../CompositionRoot";

export const App = React.memo(() => {
    const connections = useConnections();

    const appContext: AppContextState = {
        compositionRoot: getCompositionRoot(),
        connections: connections,
    };

    return (
        <AppContext.Provider value={appContext}>
            <Box display="flex" height="100vh" bgcolor={darkgrey[600]}></Box>
            <Watermark />
        </AppContext.Provider>
    );
});

const Watermark: React.FC = () => {
    const theme = useTheme();
    return (
        <Box position="fixed" left={theme.spacing(2)} bottom={theme.spacing(1)}>
            <Typography variant="h6" color="textDisabled">
                SDCP Interface
            </Typography>
        </Box>
    );
};
