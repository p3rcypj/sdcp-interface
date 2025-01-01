import React from "react";
import { Link } from "react-router-dom";

import {
    Box,
    Button,
    Stack,
    styled,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from "@mui/material";

import { useBooleanState } from "../hooks/useBoolean";

export const Printers = () => {
    const hasPrinters = false;

    return hasPrinters ? <PrintersPage /> : <NoPrintersYetPage />;
};

const PrintersPage = React.memo(() => {
    return <Box></Box>;
});

const NoPrintersYetPage = () => {
    const isVpnSettingSet = false; // TODO: to be implemented
    const [isDialogOpen, { open: openDialog, close: closeDialog }] = useBooleanState(false);

    return (
        <Box p={4} mt={4}>
            <Stack spacing={5} alignItems="center">
                <PrinterImage>
                    <span role="presentation" aria-label="Elegoo Saturn 4" />
                </PrinterImage>
                <Typography variant="h3" align="center" component="p">
                    You don't have any printers added yet
                </Typography>
                {isVpnSettingSet ? (
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        component={Link}
                        to="/printers/add-printer"
                    >
                        Add printer
                    </Button>
                ) : (
                    <Button variant="contained" size="large" color="secondary" onClick={openDialog}>
                        Add printer
                    </Button>
                )}
            </Stack>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Before we add your printer</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you running your entire setup within a VPN? If you are not sure, you can skip this
                        dialog and continue. If you are not currently using a VPN but plan to do so in the
                        future, you can change this setting later on the <strong>Settings</strong> page.
                    </Typography>
                    <Alert severity="warning" sx={{ mt: 3 }}>
                        Warning: <strong>If you intend to use this software remotely</strong> and do not set
                        up a VPN, your setup will be highly vulnerable to hackers and malicious actors who are
                        constantly scanning the internet for unprotected systems. Please ensure you follow our
                        guide on configuring your setup with a VPN to protect your data, privacy, and home
                        devices.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" component={Link} to="/printers/add-printer">
                        Skip
                    </Button>
                    <Button
                        onClick={() => {
                            //TODO: set VPN setting to false
                        }}
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/printers/add-printer"
                    >
                        No, not now
                    </Button>
                    <Button
                        onClick={() => {
                            //TODO: set VPN setting to true
                        }}
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/printers/add-printer"
                    >
                        Yes, I am
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const PrinterImage = styled("div")(({ theme }) => ({
    position: "relative",
    width: "300px",
    height: "300px",
    [theme.breakpoints.down("md")]: {
        width: "200px",
        height: "200px",
    },
    span: {
        position: "absolute",
        display: "block",
        width: "300px",
        height: "300px",
        backgroundImage: "url(./assets/images/elegoo-saturn-4.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        [theme.breakpoints.down("md")]: {
            width: "200px",
            height: "200px",
        },
    },
}));
