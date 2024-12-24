import { styled, useColorScheme, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MenuContent } from "./MenuContent";
import OptionsMenu from "./OptionsMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: "border-box",
    },
});

export default function SideMenu() {
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: "background.paper",
                },
            }}
        >
            <Box display="flex" padding={theme.spacing(2)}>
                <Box display="flex" alignItems="center" columnGap={theme.spacing(1)}>
                    <AppIcon />
                    <Typography variant="subtitle2">SDCP Interface</Typography>
                </Box>
            </Box>
            <Divider />
            <MenuContent selected="home" />
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: "center",
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Avatar
                    sizes="small"
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: "auto" }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
                        Riley Carter
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        riley@email.com
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    );
}

export const AppIcon = () => {
    const { mode, systemMode } = useColorScheme();

    const invert = mode === "dark" || (mode === "system" && systemMode === "dark") ? "invert(1)" : "none";

    return (
        <span
            role="presentation"
            style={{
                backgroundImage: "url(icon_256.png)",
                height: 24,
                width: 24,
                filter: invert,
                backgroundSize: "contain",
            }}
        ></span>
    );
};
