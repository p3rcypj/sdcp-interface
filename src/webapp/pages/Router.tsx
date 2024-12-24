import React from "react";
import { Box, alpha, Stack, useTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../template/Header";
import MainGrid from "../template/MainGrid";

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<TemplateDashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

const TemplateDashboard = () => {
    const theme = useTheme();
    return (
        <Box
            component="main"
            flexGrow={1}
            bgcolor={alpha(theme.palette.background.default, 1)}
            overflow="auto"
        >
            <Stack alignItems="center" marginX={3} paddingBottom={5} marginTop={{ xs: 8, md: 0 }} gap={2}>
                <Header />
                <MainGrid />
            </Stack>
        </Box>
    );
};

export default AppRouter;
