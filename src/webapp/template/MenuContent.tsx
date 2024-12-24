import * as React from "react";
import { Box, Typography, useTheme, SvgIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { Stack } from "../components/stack/Stack";
import { Raspberry } from "../components/icons/Raspberry";

const navigationItems = [
    { text: "Home", icon: <HomeRoundedIcon />, value: "home" },
    { text: "Dashboard", icon: <SpaceDashboardRoundedIcon />, value: "dashboard" },
    { text: "Streaming", icon: <VideocamRoundedIcon />, value: "streaming" },
];

const manageItems = [
    { text: "Printers", icon: <LocalPrintshopRoundedIcon />, value: "printers" },
    { text: "Bulk queue", icon: <QueueRoundedIcon />, value: "bulk-queue" },
    { text: "Library", icon: <CollectionsBookmarkRoundedIcon />, value: "library" },
    { text: "Inventory", icon: <CategoryRoundedIcon />, value: "inventory" },
    { text: "Store", icon: <StoreRoundedIcon />, value: "store" },
    {
        text: "Raspberry Pis",
        icon: (
            <SvgIcon viewBox="0 0 32 32">
                <Raspberry />
            </SvgIcon>
        ),
        value: "raspberry-pis",
    },
];

const storageItems = [
    { text: "Local", icon: <FolderRoundedIcon />, value: "local" },
    { text: "Cloud", icon: <CloudRoundedIcon />, value: "cloud" },
];

const adminItems = [
    { text: "Analytics", icon: <InsightsRoundedIcon />, value: "analytics" },
    { text: "Logs", icon: <ReceiptLongRoundedIcon />, value: "logs" },
    { text: "Maintenance", icon: <ConstructionRoundedIcon />, value: "maintenance" }, // TODO: add backups and schedules
    { text: "Settings", icon: <SettingsRoundedIcon />, value: "settings" }, // TODO: add integrations like zapier, webhooks, ifttt, or api, and also network settings to be added like how the network mesh is
    // { text: "Report bug", icon: <PestControlIcon />, value: "report-bug" },
    // { text: "Give feedback", icon: <HelpRoundedIcon />, value: "give-feedback" },
];

interface MenuContentProps {
    selected: string;
}

export const MenuContent: React.FC<MenuContentProps> = React.memo(props => {
    const { selected } = props;

    return (
        <Stack marginTop={1} padding={1} gap={1} flexGrow={1}>
            <SubMenu items={navigationItems} title="Views" selected={selected} />
            <SubMenu items={manageItems} title="Manage" selected={selected} />
            <SubMenu items={storageItems} title="Storage" selected={selected} />
            <SubMenu items={adminItems} title="Administration" selected={selected} />
        </Stack>
    );
});

interface SubMenuProps {
    title?: string;
    items: { text: string; icon: JSX.Element; value: string }[];
    selected: string;
}

const SubMenu: React.FC<SubMenuProps> = React.memo(props => {
    const { items, title, selected } = props;

    const theme = useTheme();

    return (
        <Box>
            {title && (
                <Typography variant="overline2" sx={{ paddingLeft: 1, color: theme.palette.text.secondary }}>
                    {title}
                </Typography>
            )}

            <List dense>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: "block" }}>
                        <ListItemButton selected={selected === item.value}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});
