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
import { useDynamicStatusView } from "./useDynamicStatusView";
import { WebsocketConnection } from "../../../domain/entities/WebsocketConnection";
import { formatMilliseconds, formatSeconds } from "../../../utils/utils";

export interface StatusViewProps {
    ws: WebsocketConnection;
}

export const StatusView: React.FC<StatusViewProps> = React.memo(({ ws }) => {
    const theme = useTheme();

    const { status } = useDynamicStatusView(ws);

    if (!status) return null;

    return (
        <Box marginTop={theme.spacing(2)}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="body2" fontWeight={600}>
                        Status:{" "}
                        <Typography variant="body2" fontWeight={400} component="span">
                            {status.currentStatus.map(getPrinterStatus).join(", ")}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" fontWeight={400}>
                        Print screen:{" "}
                        <Typography variant="body2" fontWeight={400} component="span">
                            {formatSeconds(status.printScreen)}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" fontWeight={400}>
                        Release film:{" "}
                        <Typography variant="body2" fontWeight={400} component="span">
                            {status.releaseFilm}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        UV LED Temp:{" "}
                        <Typography variant="body2" fontWeight={400} component="span">
                            {Math.floor(status.tempOfUVLED * 100) / 100} ºC
                        </Typography>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        Timelapse:{" "}
                        <Typography variant="body2" fontWeight={400} component="span">
                            {status.timeLapseStatus ? "On" : "Off"}
                        </Typography>
                    </Typography>
                    <Box
                        marginTop={theme.spacing(2)}
                        padding={theme.spacing(2)}
                        bgcolor={darkgrey[600]}
                        borderRadius={2}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Print Status:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {getPrintStatus(status.printInfo.status)}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Current Layer:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {status.printInfo.currentLayer}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Total Layers:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {status.printInfo.totalLayer}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Current Ticks:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {formatMilliseconds(status.printInfo.currentTicks)}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Total Ticks:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {formatMilliseconds(status.printInfo.totalTicks)}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Filename:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {status.printInfo.filename}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Error Number:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {status.printInfo.errorNumber}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            Task ID:{" "}
                            <Typography variant="body2" fontWeight={400} component="span">
                                {status.printInfo.taskId}
                            </Typography>
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
