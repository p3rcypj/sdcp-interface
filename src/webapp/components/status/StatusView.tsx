import React from "react";
import { Box, Card, CardActions, CardContent, Typography, useTheme } from "@mui/material";
import {
    SDCP_MACHINE_STATUS_IDLE,
    SDCP_MACHINE_STATUS_PRINTING,
    SDCP_MACHINE_STATUS_FILE_TRANSFERRING,
    SDCP_MACHINE_STATUS_EXPOSURE_TESTING,
    SDCP_MACHINE_STATUS_DEVICES_TESTING,
    SDCP_PRINT_STATUS_HOMING,
    SDCP_PRINT_STATUS_COMPLETE,
    SDCP_PRINT_STATUS_DROPPING,
    SDCP_PRINT_STATUS_EXPOSURING,
    SDCP_PRINT_STATUS_FILE_CHECKING,
    SDCP_PRINT_STATUS_LIFTING,
    SDCP_PRINT_STATUS_PAUSED,
    SDCP_PRINT_STATUS_PAUSING,
    SDCP_PRINT_STATUS_STOPED,
    SDCP_PRINT_STATUS_STOPPING,
} from "../../../data/SdcpCodes";
import { darkgrey } from "../../../utils/colors";
import { useStatusView } from "./useStatusView";

export const StatusView = React.memo(() => {
    const theme = useTheme();

    const { status } = useStatusView();

    if (!status) return null;

    return (
        <Box marginTop={theme.spacing(2)}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="body2" fontWeight={600}>
                        Status: {status.currentStatus.map(getPrinterStatus).join(", ")}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        Print screen: {status.printScreen}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        Release film: {status.releaseFilm}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        UV LED Temp: {status.tempOfUVLED}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        Timelapse: {status.timeLapseStatus ? "On" : "Off"}
                    </Typography>
                    <Box
                        marginTop={theme.spacing(2)}
                        padding={theme.spacing(2)}
                        bgcolor={darkgrey[600]}
                        borderRadius={2}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Print Status: {getPrintStatus(status.printInfo.status)}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Current Layer: {status.printInfo.currentLayer}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Total Layers: {status.printInfo.totalLayer}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Current Ticks: {status.printInfo.currentTicks}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Total Ticks: {status.printInfo.totalTicks}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Filename: {status.printInfo.filename}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Error Number: {status.printInfo.errorNumber}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Task ID: {status.printInfo.taskId}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Box>
    );
});

function getPrinterStatus(status: number) {
    switch (status) {
        case SDCP_MACHINE_STATUS_IDLE:
            return "Awake";
        case SDCP_MACHINE_STATUS_PRINTING:
            return "Printing";
        case SDCP_MACHINE_STATUS_FILE_TRANSFERRING:
            return "Transferring File";
        case SDCP_MACHINE_STATUS_EXPOSURE_TESTING:
            return "Testing Exposure";
        case SDCP_MACHINE_STATUS_DEVICES_TESTING:
            return "Testing Devices";
        default:
            return "Unknown";
    }
}

function getPrintStatus(status: number) {
    switch (status) {
        case SDCP_PRINT_STATUS_HOMING:
            return "Homing";
        case SDCP_PRINT_STATUS_DROPPING:
            return "Dropping";
        case SDCP_PRINT_STATUS_EXPOSURING:
            return "Exposing";
        case SDCP_PRINT_STATUS_LIFTING:
            return "Lifting";
        case SDCP_PRINT_STATUS_PAUSING:
            return "Pausing";
        case SDCP_PRINT_STATUS_PAUSED:
            return "Paused";
        case SDCP_PRINT_STATUS_STOPPING:
            return "Stopping";
        case SDCP_PRINT_STATUS_STOPED:
            return "Stopped";
        case SDCP_PRINT_STATUS_COMPLETE:
            return "Completed";
        case SDCP_PRINT_STATUS_FILE_CHECKING:
            return "Checking File";
        default:
            return "Unknown";
    }
}
