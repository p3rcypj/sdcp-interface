import React from "react";
import { alpha, Stack, useTheme, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

import { HeaderDesktop } from "../components/layout/HeaderDesktop";
import MainGrid from "../template/MainGrid";

export const AppRouter: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            component="main"
            flexGrow={1}
            bgcolor={alpha(theme.palette.background.default, 1)}
            overflow="auto"
            minHeight="100vh"
            mx={3}
            pb={5}
            mt={{ xs: 10, md: 0 }}
            gap={2}
        >
            <Routes>
                <Route path="/dashboard" element={<TemplateDashboard />} />
                <Route path="/" element={<></>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Stack>
    );
};

const NotFoundPage = () => (
    <>
        <HeaderDesktop hideBreadcrumbs={true} />
        <Stack flexGrow={1} alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h1">404 Not Found</Typography>
            <Typography variant="h4">The page you are looking for does not exist.</Typography>
            <Typography variant="h6">
                <Link to="/">Go to Home</Link>
            </Typography>
        </Stack>
    </>
);

const TemplateDashboard = () => (
    <>
        <HeaderDesktop />
        <MainGrid />
    </>
);
