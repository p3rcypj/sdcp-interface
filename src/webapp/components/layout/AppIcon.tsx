import { styled, useColorScheme } from "@mui/material/styles";

export const AppIcon = () => {
    const { mode, systemMode } = useColorScheme();
    const invert = mode === "dark" || (mode === "system" && systemMode === "dark") ? "invert(1)" : "none";

    return <Icon filter={invert} role="presentation" />;
};

const Icon = styled("span")((props: { filter: string }) => ({
    backgroundImage: "url(icon_256.png)",
    height: 24,
    width: 24,
    filter: props.filter,
    backgroundSize: "contain",
}));
