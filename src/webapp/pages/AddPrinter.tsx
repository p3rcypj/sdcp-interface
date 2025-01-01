import React from "react";

import {
    InfoOutlined as InfoOutlinedIcon,
    WifiFindRounded as WifiFindRoundedIcon,
    AutoFixHighRounded as AutoFixHighRoundedIcon,
    HelpOutlineRounded as HelpOutlineRoundedIcon,
    WifiRounded as WifiRoundedIcon,
    AddCircleOutlineRounded as AddCircleOutlineRoundedIcon,
} from "@mui/icons-material";

import {
    Typography,
    Tooltip,
    FormControl,
    OutlinedInput,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
} from "@mui/material";

import { FluidContainer } from "../components/layout/FluidContainer";
import { Flex } from "../components/layout/Flex";
import { Stack } from "../components/layout/Stack";
import { useBooleanState } from "../hooks/useBoolean";
import { useToBeImplementedSnackbar } from "../hooks/useToBeImplementedSnackbar";

export const AddPrinter = React.memo(() => {
    const toBeImplemented = useToBeImplementedSnackbar();
    const [isDialogOpen, { open: openDialog, close: closeDialog }] = useBooleanState(false);

    const autoDetect = () => {
        toBeImplemented();
    };

    return (
        <FluidContainer>
            <Stack spacing={3}>
                <Flex gap={3} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <NetworkDiscoverForm openDialog={openDialog} />
                    <NetworkManualForm />
                </Flex>
                <PrintersFound />
            </Stack>
            <HelpDialog isOpen={isDialogOpen} onClose={closeDialog} onAutoDetect={autoDetect} />
        </FluidContainer>
    );
});

interface DiscoverFormProps {
    openDialog: () => void;
}

const NetworkDiscoverForm: React.FC<DiscoverFormProps> = props => {
    const toBeImplemented = useToBeImplementedSnackbar();

    const discover = () => {
        toBeImplemented();
    };

    return (
        <Card>
            <CardContent>
                <Typography
                    component="h2"
                    variant="h6"
                    sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}
                >
                    Discover printers on network
                    <Tooltip title="If you are under a VPN, you must add your printer hosts IPs manually. As VPN don't have normally broadcast address.">
                        <InfoOutlinedIcon fontSize="small" />
                    </Tooltip>
                </Typography>

                <Stack gap={2}>
                    <FormControl variant="outlined">
                        <Typography
                            variant="body2"
                            sx={{ mb: 1, display: "flex", gap: 0.5, alignItems: "center" }}
                        >
                            Broadcast Address
                            <Tooltip title="The broadcast address is a special type of networking IP address that is used to send data to all possible hosts in the network. For a typical home network, it might look like 192.168.1.255.">
                                <InfoOutlinedIcon fontSize="smallest" />
                            </Tooltip>
                        </Typography>

                        <Flex gap={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                            <OutlinedInput placeholder="192.168.1.255" aria-label="Broadcast address" />

                            <Button
                                onClick={discover}
                                variant="contained"
                                color="primary"
                                endIcon={<WifiFindRoundedIcon />}
                            >
                                Discover
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                endIcon={<HelpOutlineRoundedIcon />}
                                onClick={props.openDialog}
                            >
                                Help
                            </Button>
                        </Flex>
                    </FormControl>
                </Stack>
            </CardContent>
        </Card>
    );
};

const NetworkManualForm = () => {
    const toBeImplemented = useToBeImplementedSnackbar();

    return (
        <Card>
            <CardContent>
                <Typography
                    component="h2"
                    variant="h6"
                    sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}
                >
                    {/* If VPN, should be only "Add printer" */}
                    Add printer manually
                </Typography>

                <Stack gap={2}>
                    <FormControl variant="outlined">
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            IP Address
                        </Typography>
                        <Flex gap={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                            <OutlinedInput placeholder="192.168.1.X" aria-label="IP address" />

                            <Button
                                onClick={toBeImplemented}
                                variant="contained"
                                color="primary"
                                endIcon={<WifiRoundedIcon />}
                            >
                                Test connectivity
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                endIcon={<AddCircleOutlineRoundedIcon />}
                                onClick={toBeImplemented}
                                disabled
                            >
                                Add printer
                            </Button>
                        </Flex>
                    </FormControl>

                    <FormControl variant="outlined">
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            MAC Address
                        </Typography>
                        <Flex gap={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                            <OutlinedInput placeholder="00:1A:2B:3C:4D:5E" aria-label="MAC address" />

                            <Button
                                onClick={toBeImplemented}
                                variant="contained"
                                color="primary"
                                endIcon={<WifiRoundedIcon />}
                            >
                                Test connectivity
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                endIcon={<AddCircleOutlineRoundedIcon />}
                                onClick={toBeImplemented}
                                disabled
                            >
                                Add printer
                            </Button>
                        </Flex>
                    </FormControl>
                </Stack>
            </CardContent>
        </Card>
    );
};

const PrintersFound = () => {
    const toBeImplemented = useToBeImplementedSnackbar();

    return (
        <Box>
            <Typography
                component="h2"
                variant="h6"
                sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}
            >
                Printers found
            </Typography>

            <Stack gap={2}></Stack>
        </Box>
    );
};

interface HelpDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAutoDetect: () => void;
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose, onAutoDetect }) => (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Help with Broadcast Address</DialogTitle>
        <DialogContent>
            <Typography gutterBottom>
                When you discover for printers on your network using a software like ChituManager, it is
                sending a broadcast message to all your devices on your network awaiting for your printers to
                answer to it. This allows ChituManager to know which printers are available on your network
                automatically.
            </Typography>

            <Typography gutterBottom>
                That broadcast message is just sent to a specific type IP address that translates into sending
                messages to all possible hosts in the network. For a typical home network, it might look like
                192.168.1.255 or 192.168.0.255.
            </Typography>

            <Typography gutterBottom>
                If you are not sure about your broadcast address, you can try to auto-detect it. This might
                not work in all network configurations, especially if you are connected to a VPN or a more
                complex network setup.
            </Typography>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
            <Button
                onClick={onAutoDetect}
                color="secondary"
                variant="contained"
                endIcon={<AutoFixHighRoundedIcon />}
            >
                Auto-Detect
            </Button>
        </DialogActions>
    </Dialog>
);

function HighlightedCard() {
    const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Card sx={{ width: 500 }}>
            <CardContent></CardContent>
        </Card>
    );
}
