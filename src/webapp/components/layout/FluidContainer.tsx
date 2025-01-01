import React from "react";
import Box from "@mui/material/Box";

interface FluidContainerProps {
    children: React.ReactNode;
}

export const FluidContainer: React.FC<FluidContainerProps> = ({ children }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {children}
        </Box>
    );
};
