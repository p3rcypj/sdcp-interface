import { MenuRounded as MenuRoundedIcon } from "@mui/icons-material";

import {
    Stack,
    AppBar,
    Toolbar as MuiToolbar,
    Typography,
    tabsClasses,
    styled,
    SxProps,
} from "@mui/material";

import { useBooleanState } from "../../hooks/useBoolean";
import { SideMenuMobile } from "./SideMenuMobile";
import { MenuButton } from "./MenuButton";
import { AppIcon } from "./AppIcon";
import { CommonButtons } from "./HeaderDesktop";

export const AppNavbarMobile = () => {
    const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] = useBooleanState(false);

    return (
        <AppBar position="fixed" sx={appBarSx}>
            <Toolbar variant="regular">
                <Stack direction="row" alignItems="center" flexGrow={1} width="100%" gap={1}>
                    <Stack direction="row" spacing={1} alignItems="center" mr="auto">
                        <AppIcon />
                        <Typography variant="h5" component="h1" sx={{ color: "text.primary" }}>
                            SDCP Interface
                        </Typography>
                    </Stack>

                    <CommonButtons />

                    <MenuButton aria-label="menu" onClick={openDrawer}>
                        <MenuRoundedIcon />
                    </MenuButton>

                    <SideMenuMobile open={isDrawerOpen} closeDrawer={closeDrawer} />
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

const appBarSx: SxProps = {
    display: { xs: "auto", md: "none" },
    boxShadow: 0,
    bgcolor: "background.paper",
    backgroundImage: "none",
    borderBottom: "1px solid",
    borderColor: "divider",
    top: 0,
};

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
