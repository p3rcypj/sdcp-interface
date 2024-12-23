import React from "react";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { AppContext, AppContextState } from "./context";
import { useConnections } from "../hooks/useConnections";
import { getCompositionRoot } from "../../CompositionRoot";
import SideMenu from "../template/SideMenu";
import AppNavbar from "../template/AppNavbar";
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
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={theme => ({
                        flexGrow: 1,
                        backgroundColor: alpha(theme.palette.background.default, 1),
                        overflow: "auto",
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <MainGrid />
                    </Stack>
                </Box>
            </Box>
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
