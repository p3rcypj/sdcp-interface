import React from "react";
import { Box, StackProps, BoxProps } from "@mui/material";

const areEqual = (prevProps: StackProps & BoxProps, nextProps: StackProps & BoxProps) => {
    const isEqual = prevProps.children === nextProps.children;
    if (!isEqual) console.debug("Stack: re-render");

    return isEqual;
};

export const Stack: React.FC<StackProps & BoxProps> = React.memo(props => {
    const { children, direction = "column", spacing = 0, divider, ...rest } = props;

    const childrenArray = React.Children.toArray(children);

    return (
        <Box display="flex" flexDirection={direction} gap={spacing} {...rest}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {index < childrenArray.length - 1 && divider}
                </React.Fragment>
            ))}
        </Box>
    );
}, areEqual);
