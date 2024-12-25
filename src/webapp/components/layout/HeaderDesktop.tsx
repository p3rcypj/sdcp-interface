import { SxProps, Box } from "@mui/material";

import {
    NotificationsRounded as NotificationsRoundedIcon,
    HistoryRounded as HistoryRoundedIcon,
    SchoolRounded as SchoolRoundedIcon,
} from "@mui/icons-material";

import { NavbarBreadcrumbs } from "./NavbarBreadcrumbs";
import { MenuButton } from "./MenuButton";
import { Stack } from "./Stack";
import { UserMenuDesktop } from "./UserMenuDesktop";

interface HeaderProps {
    hideBreadcrumbs?: boolean;
}

export const HeaderDesktop: React.FC<HeaderProps> = ({ hideBreadcrumbs }) => (
    <Stack direction="row" sx={headerSx} spacing={2}>
        {hideBreadcrumbs ? <Box></Box> : <NavbarBreadcrumbs />}

        <Stack direction="row" gap={1} alignItems="center">
            <MenuButton title="Open guide">
                <SchoolRoundedIcon />
            </MenuButton>

            <CommonButtons />

            <UserMenuDesktop />
        </Stack>
    </Stack>
);

export const CommonButtons = () => (
    <>
        <MenuButton title="Open history registry">
            <HistoryRoundedIcon fontSize="large" />
        </MenuButton>

        <MenuButton showBadge title="Open notifications">
            <NotificationsRoundedIcon />
        </MenuButton>
    </>
);

const headerSx: SxProps = {
    display: { xs: "none", md: "flex" },
    width: "100%",
    alignItems: { xs: "flex-start", md: "center" },
    justifyContent: "space-between",
    maxWidth: { sm: "100%", md: "1700px" },
    pt: 1.5,
};
