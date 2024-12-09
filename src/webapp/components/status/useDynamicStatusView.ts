import React from "react";
import { PrinterStatus } from "../../../domain/entities/Printer";
import { getPrinterStatus, StatusCodec } from "../../../data/codec/Status";
import { WebsocketConnection } from "../../../domain/entities/WebsocketConnection";

export function useDynamicStatusView(ws: WebsocketConnection) {
    const [status, setStatus] = React.useState<PrinterStatus>();

    React.useEffect(() => {
        if (ws) {
            ws.addLogger({
                onMessage: message => {
                    if (message.type === "info") {
                        StatusCodec.decode(message.data).ifRight(codec => {
                            setStatus(getPrinterStatus(codec));
                        });
                    }
                },
                onError: error => {
                    alert(error.reason);
                    setStatus(undefined);
                },
            });
        }
    }, [ws]);

    return {
        status: status,
    };
}
