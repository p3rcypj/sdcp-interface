import {
    Drawer as MuiDrawer,
    drawerClasses,
    Box,
    Divider,
    Typography,
    styled,
    useTheme,
} from "@mui/material";

import { MenuContent } from "./MenuContent";
import { AppIcon } from "./AppIcon";

export const SideMenuDesktop = () => {
    const theme = useTheme();

    return (
        <Drawer variant="permanent">
            <Box display="flex" p={theme.spacing(2)}>
                <Box display="flex" alignItems="center" columnGap={theme.spacing(1)}>
                    <AppIcon />
                    <Typography variant="subtitle2">SDCP Interface</Typography>
                </Box>
            </Box>

            <Divider />
            <MenuContent />
        </Drawer>
    );
};

const DRAWER_WIDTH = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    boxSizing: "border-box",
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: DRAWER_WIDTH,
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.paper,
    },
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    [theme.breakpoints.up("md")]: {
        display: "block",
    },
}));
