import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideMenuMobile from "./SideMenuMobile";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from ".././theme/ColorModeIconDropdown";
import { AppIcon } from "./SideMenu";
import { Stack } from "@mui/material";

const Toolbar = styled(MuiToolbar)({
    width: "100%",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    gap: "12px",
    flexShrink: 0,
    [`& ${tabsClasses.flexContainer}`]: {
        gap: "8px",
        p: "8px",
        pb: 0,
    },
});

export default function AppNavbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                display: { xs: "auto", md: "none" },
                boxShadow: 0,
                bgcolor: "background.paper",
                backgroundImage: "none",
                borderBottom: "1px solid",
                borderColor: "divider",
                top: 0,
            }}
        >
            <Toolbar variant="regular">
                <Stack direction="row" alignItems="center" flexGrow={1} width="100%" gap={1}>
                    <Stack direction="row" spacing={1} alignItems="center" marginRight="auto">
                        <AppIcon />
                        <Typography variant="h5" component="h1" sx={{ color: "text.primary" }}>
                            SDCP Interface
                        </Typography>
                    </Stack>
                    <ColorModeIconDropdown />
                    <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuRoundedIcon />
                    </MenuButton>
                    <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
