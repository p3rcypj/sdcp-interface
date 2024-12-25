import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Stack } from "../components/stack/Stack";
import OptionsMenu from "./OptionsMenu";

export default function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: { xs: "none", md: "flex" },
                width: "100%",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                maxWidth: { sm: "100%", md: "1700px" },
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs />
            <Stack direction="row" gap={1} alignItems="center">
                <MenuButton aria-label="Open notifications">
                    <SchoolRoundedIcon />
                </MenuButton>
                <MenuButton aria-label="Open notifications">
                    <HistoryRoundedIcon fontSize="large" />
                </MenuButton>
                <MenuButton showBadge aria-label="Open notifications">
                    <NotificationsRoundedIcon />
                </MenuButton>
                <OptionsMenu />
            </Stack>
        </Stack>
    );
}
