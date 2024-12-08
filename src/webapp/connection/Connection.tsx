import React from "react";
import { Box, TextField, Button, useTheme, Typography, Divider } from "@mui/material";
import { useWebsocket } from "../hooks/useWebsocket";
import { Wifi as WifiIcon, WifiOff as WifiOffIcon } from "@mui/icons-material";

const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

const WEBSOCKET_PORT = 3030;

export const Connection = () => {
    const theme = useTheme();

    const [host, setHost] = React.useState("");

    const validHost = React.useMemo(() => ipRegex.test(host), [host]);

    const ws = useWebsocket(
        host,
        WEBSOCKET_PORT,
        (message: any) => {
            console.log(message);
        },
        (error: any) => {
            console.error(error);
        }
    );

    const updateHost = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setHost(event.target.value);
    }, []);

    const connect = React.useCallback(() => {
        ws.open();
    }, [ws]);

    const close = React.useCallback(() => {
        ws.close();
    }, [ws]);

    const calculateElapsedTime = React.useCallback(
        () => (ws?.startTime ? formatElapsedTime(Date.now() - ws.startTime) : "00:00:00"),
        [ws.startTime]
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
                />
                {ws.status === "disconnected" && (
                    <Button
                        variant="contained"
                        onClick={connect}
                        startIcon={<WifiIcon />}
                        disabled={!validHost}
                    >
                        Connect
                    </Button>
                )}
                {ws.status === "connected" && (
                    <Button variant="outlined" onClick={close} startIcon={<WifiOffIcon />}>
                        Close
                    </Button>
                )}
                {ws.status === "connected" && (
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

const formatElapsedTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};
