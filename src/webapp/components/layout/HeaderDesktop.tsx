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
import Tooltip from "../TooltipEventWrapper";

interface HeaderProps {
    hideBreadcrumbs?: boolean;
}

export const HeaderDesktop: React.FC<HeaderProps> = ({ hideBreadcrumbs }) => (
    <Stack direction="row" sx={headerSx} spacing={2}>
        {hideBreadcrumbs ? <Box></Box> : <NavbarBreadcrumbs />}

        <Stack direction="row" gap={1} alignItems="center">
            <Tooltip title="Open guide">
                <MenuButton>
                    <SchoolRoundedIcon />
                </MenuButton>
            </Tooltip>

            <CommonButtons />

            <UserMenuDesktop />
        </Stack>
    </Stack>
);

export const CommonButtons = () => (
    <>
        <Tooltip title="Show history registry">
            <MenuButton>
                <HistoryRoundedIcon fontSize="large" />
            </MenuButton>
        </Tooltip>

        <Tooltip title="See notifications">
            <MenuButton showBadge>
                <NotificationsRoundedIcon />
            </MenuButton>
        </Tooltip>
    </>
);

const headerSx: SxProps = {
    display: { xs: "none", md: "flex" },
    width: "100%",
    alignItems: { xs: "flex-start", md: "center" },
    justifyContent: "space-between",
    pt: 1.5,
};
