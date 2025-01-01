import React from "react";
import { Tooltip, Box } from "@mui/material";

/**
 * The `TooltipEventWrapper` component is a utility component designed to ensure proper event handling for tooltips.
 * It wraps its children with a `Box` component to ensure that the `Tooltip` can properly listen to React events such as `onMouseOver` and `onMouseOut`.
 * This is particularly useful for interactive elements like buttons.
 */
const TooltipEventWrapper: React.FC<{ title: string; children: React.ReactNode }> = props => (
    <Tooltip title={props.title}>
        <Box>{props.children}</Box>
    </Tooltip>
);

export default TooltipEventWrapper;
