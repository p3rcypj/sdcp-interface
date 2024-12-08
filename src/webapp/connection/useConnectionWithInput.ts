import React from "react";
import { useAppContext } from "../app/context";
import { Logger } from "../../domain/entities/generic/Logger";
import { WebsocketConnection } from "../../domain/entities/WebsocketConnection";

const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

export function useConnectionWithInput(logger: Logger) {
    const { connections } = useAppContext();

    const [ws, setWs] = React.useState<WebsocketConnection>();
    const [host, setHost] = React.useState("");

    const isValid = React.useMemo(() => ipRegex.test(host), [host]);

    const updateHost = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setHost(event.target.value);
    }, []);

    const initConnection = React.useCallback(() => {
        if (isValid) {
            const ws = new WebsocketConnection(host, WebsocketConnection.PORT, logger);
            setWs(ws);
            connections.add(ws);
        } else logger.onError({ reason: "Invalid IP address", data: host });
    }, [connections, host, logger, isValid]);

    const connect = React.useCallback(() => {
        if (ws) {
            // if (ws.getTarget().host !== host || ws.getTarget().port !== WebsocketConnection.PORT)
            //     initConnection();
            // if (ws.getStatus() === "disconnected") ws.connect();
            // else
            //     logger.onMessage({
            //         type: "info",
            //         message: `Connection already exists`,
            //         data: ws.getTarget(),
            //     });
        } else initConnection();
    }, [initConnection, ws]);

    const close = React.useCallback(() => {
        if (ws) ws.close();
        else logger.onError({ reason: "No connection to close", data: host });
    }, [host, logger, ws]);

    return {
        host,
        updateHost,
        connect,
        close,
        isValid,
    };
}
