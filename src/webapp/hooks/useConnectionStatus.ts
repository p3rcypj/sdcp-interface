import React from "react";
import { Maybe } from "../../utils/ts-utils";
import { useAppContext } from "../app/context";

export function useConnectionStatus(id: string): Maybe<"connected" | "disconnected"> {
    const { connections } = useAppContext();

    const [ws, setWs] = React.useState(connections.getById(id));
    const [status, setStatus] = React.useState(ws?.getStatus() ?? "disconnected");

    React.useEffect(() => {
        if (ws) {
            const handleStatusChange = () => setStatus(ws.getStatus());
            ws.addEventListener("statusChange", handleStatusChange);
            return () => ws.removeEventListener("statusChange", handleStatusChange);
        }
    }, [ws]);

    React.useEffect(() => {
        setWs(connections.getById(id));
    }, [id, connections]);

    return status;
}
