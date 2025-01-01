import { styled } from "@mui/material";

export const AnchorStyleButton = styled("button")({
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
    "&:active": {
        color: "inherit",
        textDecoration: "underline",
    },
});
