import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React from "react";

interface MenuButtonProps extends IconButtonProps {
    showBadge?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = React.memo(({ showBadge = false, ...props }) => (
    <Badge
        color="error"
        variant="dot"
        invisible={!showBadge}
        sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
        <IconButton size="small" {...props} />
    </Badge>
));
