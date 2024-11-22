import { createTheme, Theme, useTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

export function useOverrideTheme(theme: Theme | ((theme: Theme) => Theme)): Theme {
    const parentTheme = useTheme();
    if (typeof theme === "function") return createTheme(deepmerge(parentTheme, theme(parentTheme)));
    else return createTheme(deepmerge(parentTheme, theme));
}
