import React from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import {
    Avatar,
    Button,
    Divider,
    Drawer as MuiDrawer,
    Typography,
    drawerClasses,
    styled,
    Box,
} from "@mui/material";

import { MenuContent } from "./MenuContent";
import { Stack } from "./Stack";

interface SideMenuMobileProps {
    open: boolean;
    closeDrawer: () => void;
}

export const SideMenuMobile: React.FC<SideMenuMobileProps> = React.memo(({ open, closeDrawer }) => (
    <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Stack direction="row" gap={1} alignItems="center" flexGrow={1} py={2} px={2}>
            <Avatar
                sizes="small"
                alt="Riley Carter"
                src="/static/images/avatar/7.jpg"
                sx={{ width: 24, height: 24 }}
            />

            <Typography component="p" variant="h6">
                Riley Carter
            </Typography>
        </Stack>

        <Divider />

        <MenuContent />

        <Box mt={5}>
            <Divider />
            <Box p={2}>
                <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
                    Logout
                </Button>
            </Box>
        </Box>
    </Drawer>
));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    [`& .${drawerClasses.paper}`]: {
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        minWidth: "290px",
        maxWidth: "70dvw",
        height: "100%",
    },
}));
