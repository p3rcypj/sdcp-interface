import React from "react";
import { useAppContext } from "../../app/context";
import { PrinterStatus } from "../../../domain/entities/Printer";
import { getPrinterStatus, StatusCodec } from "../../../data/codec/Status";

export function useStatusView() {
    const { connections } = useAppContext();

    const [status, setStatus] = React.useState<PrinterStatus>();

    const ws = React.useMemo(() => connections.items[0], [connections]);

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
