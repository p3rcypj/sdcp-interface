import React from "react";
import { Box, TextField, Button, useTheme, Typography, Divider } from "@mui/material";
import { Wifi as WifiIcon, WifiOff as WifiOffIcon } from "@mui/icons-material";
import { useAppContext } from "../app/context";
import { useConnectionWithInput } from "./useConnectionWithInput";
import { useConnectionStatus } from "../hooks/useConnectionStatus";

export const ConnectionWithInput = () => {
    const theme = useTheme();

    const { connections } = useAppContext();

    const { host, updateHost, connect, close, isValid } = useConnectionWithInput({
        onMessage: console.debug,
        onError: console.error,
    });

    const ws = React.useMemo(() => connections.getByHost(host), [connections, host]);
    const status = useConnectionStatus(ws?.getId() ?? "");

    const calculateElapsedTime = React.useCallback(
        () => (ws ? formatElapsedTime(ws.getElapsedTime()) : "00:00:00"),
        [ws]
    );

    const [timeElapsed, setTimeElapsed] = React.useState<string>(calculateElapsedTime());

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimeElapsed(calculateElapsedTime());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <Box>
            <Typography variant="body2" color={theme.palette.text.disabled}>
                WebSocket connection
            </Typography>
            <Divider />
            <Box display="flex" columnGap={theme.spacing(1)} marginTop={theme.spacing(2)}>
                <TextField
                    label="Printer IP"
                    value={host}
                    placeholder="0.0.0.0"
                    onChange={updateHost}
                    size="small"
                    disabled={status === "connected"}
                />
                {status === "disconnected" && (
                    <Button
                        variant="contained"
                        onClick={connect}
                        startIcon={<WifiIcon />}
                        disabled={!isValid}
                    >
                        Connect
                    </Button>
                )}
                {status === "connected" && (
                    <Button variant="outlined" onClick={close} startIcon={<WifiOffIcon />}>
                        Close
                    </Button>
                )}
                {status === "connected" && (
                    <Box display="flex" alignItems="center" marginLeft={theme.spacing(1)}>
                        <Typography variant="body1" color={theme.palette.text.disabled}>
                            {timeElapsed}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

function formatElapsedTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}
