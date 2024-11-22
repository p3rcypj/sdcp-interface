import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AppContext, defaultAppContext } from "./context";
import { darkgrey } from "../../utils/colors";

export const App = React.memo(() => {
    const [appContext, _setAppContext] = React.useState(defaultAppContext);

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
            <Typography variant="h1" color="textDisabled">
                SDCP Interface
            </Typography>
        </Box>
    );
};
