import _ from "lodash";
import { useLocation } from "react-router-dom";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";
import { Breadcrumbs, breadcrumbsClasses, Typography, styled } from "@mui/material";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.vars || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: "center",
    },
}));

export const NavbarBreadcrumbs = () => {
    const location = useLocation();
    const currentPath = location.pathname.slice(1);
    const pages = currentPath.split("/").map(p => _.startCase(p));

    return (
        <StyledBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
            {pages.map((page, index) => (
                <Typography
                    key={index}
                    variant="body1"
                    sx={index === pages.length - 1 ? { color: "text.primary", fontWeight: 600 } : undefined}
                >
                    {page}
                </Typography>
            ))}
        </StyledBreadcrumbs>
    );
};
