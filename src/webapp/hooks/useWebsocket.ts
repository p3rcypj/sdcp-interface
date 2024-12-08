import React from "react";

type Status = "disconnected" | "connected";

const NORMAL_CLOSURE = 1000;

export function useWebsocket(
    host: string,
    port: number,
    onMessage: (message: any) => void,
    onError: (error: any) => void
) {
    const [status, setStatus] = React.useState<Status>("disconnected");
    const [ws, setWs] = React.useState<WebSocket>();

    const [startTime, setStartTime] = React.useState<number>();

    const id = React.useMemo(() => Date.now(), []);
    const url = React.useMemo(() => `ws://${host}:${port}/websocket`, [host, port]);

    const open = React.useCallback(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setStatus("connected");
            setStartTime(Date.now());

            console.debug(`Connection established with ${host}`);

            const pingMessage = {
                cmd: "ping",
                id: id,
                data: {},
            };

            ws.send(JSON.stringify(pingMessage));

            // Close after 5 minutes
            setTimeout(() => {
                console.debug(`Closing connection with ${host}...`);
                ws.close(NORMAL_CLOSURE, "Normal closure");
            }, 300_000); // 5 minutes
        };

        ws.onmessage = event => {
            console.debug("Received: ", event.data);
            onMessage(JSON.parse(event.data));
        };

        ws.onclose = () => {
            console.debug("Connection closed");
            setStatus("disconnected");
        };

        ws.onerror = error => {
            console.error("WebSocket error:", error);
            onError(error);
        };

        setWs(ws);
    }, [host, id, onError, onMessage, url]);

    const close = React.useCallback(() => ws?.close(NORMAL_CLOSURE, "Closing connection"), [ws]);

    React.useEffect(() => {
        return () => {
            close();
        };
    }, [close, host, port]);

    const readyState = React.useMemo(() => ws?.readyState, [ws?.readyState]);

    return {
        status,
        open,
        close,
        readyState,
        startTime,
    };
}
