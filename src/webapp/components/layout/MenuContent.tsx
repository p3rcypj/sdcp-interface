import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import {
    HomeRounded as HomeRoundedIcon,
    SettingsRounded as SettingsRoundedIcon,
    SpaceDashboardRounded as SpaceDashboardRoundedIcon,
    VideocamRounded as VideocamRoundedIcon,
    LocalPrintshopRounded as LocalPrintshopRoundedIcon,
    InsightsRounded as InsightsRoundedIcon,
    CloudRounded as CloudRoundedIcon,
    StoreRounded as StoreRoundedIcon,
    ReceiptLongRounded as ReceiptLongRoundedIcon,
    FolderRounded as FolderRoundedIcon,
    CollectionsBookmarkRounded as CollectionsBookmarkRoundedIcon,
    QueueRounded as QueueRoundedIcon,
    ConstructionRounded as ConstructionRoundedIcon,
    CategoryRounded as CategoryRoundedIcon,
    PersonRounded as PersonRoundedIcon,
    TuneRounded as TuneRoundedIcon,
} from "@mui/icons-material";

import {
    Box,
    Typography,
    useTheme,
    SvgIcon,
    useMediaQuery,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { Stack } from "./Stack";
import { Raspberry } from "../icons/Raspberry";

export const MenuContent = () => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));
    const { navigation, manage, storage, admin, user } = menuItems;

    return (
        <Stack mt={1} p={1} gap={1} flexGrow={1}>
            <SubMenu items={navigation} title="Views" />
            <SubMenu items={manage} title="Manage" />
            <SubMenu items={storage} title="Storage" />
            <SubMenu items={admin} title="Administration" />
            {mobile && <SubMenu items={user} title="User" />}
        </Stack>
    );
};

interface SubMenuProps {
    title: string;
    items: { text: string; icon: JSX.Element; value: string; disabled?: boolean }[];
}

const SubMenu: React.FC<SubMenuProps> = props => {
    const { items, title } = props;

    const theme = useTheme();
    const location = useLocation();
    const currentPath = location.pathname.slice(1);

    return (
        <Box>
            <Typography variant="overline2" sx={{ pl: 1, color: theme.palette.text.secondary }}>
                {title}
            </Typography>

            <List dense>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            selected={currentPath === item.value}
                            component={RouterLink}
                            to={`/${item.value}`}
                            disabled={item.disabled}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

const menuItems = {
    navigation: [
        { text: "Home", icon: <HomeRoundedIcon />, value: "" },
        { text: "Dashboard", icon: <SpaceDashboardRoundedIcon />, value: "dashboard" },
        { text: "Streaming", icon: <VideocamRoundedIcon />, value: "streaming", disabled: true },
    ],
    manage: [
        { text: "Printers", icon: <LocalPrintshopRoundedIcon />, value: "printers" },
        { text: "Bulk queue", icon: <QueueRoundedIcon />, value: "bulk-queue", disabled: true },
        { text: "Library", icon: <CollectionsBookmarkRoundedIcon />, value: "library", disabled: true },
        { text: "Inventory", icon: <CategoryRoundedIcon />, value: "inventory", disabled: true },
        { text: "Store", icon: <StoreRoundedIcon />, value: "store", disabled: true },
        {
            text: "Raspberry Pis",
            icon: (
                <SvgIcon viewBox="0 0 32 32">
                    <Raspberry />
                </SvgIcon>
            ),
            value: "raspberry-pis",
            disabled: true,
        },
    ],
    storage: [
        { text: "Local", icon: <FolderRoundedIcon />, value: "local" },
        { text: "Cloud", icon: <CloudRoundedIcon />, value: "cloud", disabled: true },
    ],
    admin: [
        { text: "Analytics", icon: <InsightsRoundedIcon />, value: "analytics", disabled: true },
        { text: "Logs", icon: <ReceiptLongRoundedIcon />, value: "logs", disabled: true },
        // TODO: add backups and schedules
        { text: "Maintenance", icon: <ConstructionRoundedIcon />, value: "maintenance", disabled: true },
        // TODO: add integrations like zapier, webhooks, ifttt, or api, and also network settings to be added like how the network mesh is
        { text: "Settings", icon: <SettingsRoundedIcon />, value: "settings" },
        // { text: "Report bug", icon: <PestControlIcon />, value: "report-bug" },
        // { text: "Give feedback", icon: <HelpRoundedIcon />, value: "give-feedback" },
    ],
    user: [
        { text: "Profile", icon: <PersonRoundedIcon />, value: "profile", disabled: true },
        { text: "Preferences", icon: <TuneRoundedIcon />, value: "preferences", disabled: true },
    ],
};
