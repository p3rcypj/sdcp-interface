import React from "react";
import { Box, BoxProps } from "@mui/material";

const areEqual = (prevProps: FlexProps, nextProps: FlexProps) => {
    const isEqual = prevProps.children === nextProps.children;
    if (!isEqual && process.env.NODE_ENV === "development") console.debug("Stack: re-render");

    return isEqual;
};

interface FlexProps extends BoxProps {
    column?: boolean;
}

export const Flex: React.FC<FlexProps> = React.memo(
    ({ column, ...rest }) => <Box display="flex" flexDirection={column ? "column" : "row"} {...rest} />,
    areEqual
);
