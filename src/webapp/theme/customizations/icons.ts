import { Theme, Components } from "@mui/material/styles";

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsSizeOverrides {
        smallest: true;
    }
}

export const iconsCustomizations: Components<Theme> = {
    MuiSvgIcon: {
        variants: [
            {
                props: { fontSize: "smallest" },
                style: {
                    fontSize: "1rem",
                },
            },
        ],
    },
};
