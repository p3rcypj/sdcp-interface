// https://github.com/cbd-tech/SDCP-Smart-Device-Control-Protocol-V3.0.0/blob/main/SDCP(Smart%20Device%20Control%20Protocol)_V3.0.0_EN.md

import { Codec } from "purify-ts";
import { Logger } from "../../domain/entities/generic/Logger";
import { PrinterAttributes, PrinterFile, PrinterStatus } from "../../domain/entities/Printer";
import { Task } from "../../domain/entities/Task";
import { WebsocketConnection } from "../../domain/entities/WebsocketConnection";
import {
    BatchDeleteFilesArgs,
    SdcpBasicArgs,
    SdcpRepository,
    SdcpResponse,
    StartPrintArgs,
    TerminateFileTransferArgs,
    UploadFileArgs,
} from "../../domain/repositories/SdcpRepository";
import {
    BasicAckCodec,
    BasicAckResponse,
    getResponseCodec,
    SdcpRequestResponse,
} from "../codec/SdcpWebsocketResponse";
import { getPrinterStatus, StatusCodec } from "../codec/Status";
import { CMD_STATUS_REFRESH, SDCP_FROM_WEB } from "../SdcpCodes";

export class SdcpWebsocketRepository implements SdcpRepository {
    discover(): Promise<void> {
        throw new Error("Not implemented");
    }

    ping(): Promise<"pong"> {
        throw new Error("Not implemented");
    }

    getAttributes(args: SdcpBasicArgs): Promise<PrinterAttributes> {
        throw new Error("Not implemented");
    }

    getStatus(args: SdcpBasicArgs): Promise<PrinterStatus> {
        const { ws } = args;

        const requestId = "get-status-" + nowToHex();

        const statusBody = this.getBodyRequest({
            args,
            requestId,
            command: CMD_STATUS_REFRESH,
            data: {},
        });

        this.awaitRequestResponse<BasicAckResponse>(ws, requestId, BasicAckCodec).then(res => {
            console.debug("Status ACK: " + res.Data.Data.Ack);
        });

        const statusListener = this.awaitStatusResponse(ws);

        ws.send(statusBody);

        return statusListener.then(res => getPrinterStatus(res));
    }

    terminateFileTransfer(args: TerminateFileTransferArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    refreshStatus(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    startPrint(args: StartPrintArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    pausePrint(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    stopPrint(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    resumePrint(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    stopFeedingMaterial(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    skipPreheating(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    changePrinterName(args: SdcpBasicArgs & { name: string }): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    getFileList(args: SdcpBasicArgs & { url: string }): Promise<SdcpResponse<{ filelist: PrinterFile[] }>> {
        // "/usb/" represents USB storage space.
        // "/local/" represents onboard storage space.
        // If there is no "/", the default is "/local/".

        // The motherboard will automatically filter out files that cannot be printed.
        throw new Error("Not implemented");
    }

    batchDeleteFiles(args: BatchDeleteFilesArgs): Promise<SdcpResponse<{ errFiles: string[] }>> {
        throw new Error("Not implemented");
    }

    getHistoricalTasks(args: SdcpBasicArgs): Promise<SdcpResponse<{ taskIds: string[] }>> {
        throw new Error("Not implemented");
    }

    getTaskDetails(args: SdcpBasicArgs & { id: string[] }): Promise<SdcpResponse<{ task: Task }>> {
        throw new Error("Not implemented");
    }

    enableVideoStream(args: SdcpBasicArgs): Promise<SdcpResponse<{ rstpUrl: string }>> {
        throw new Error("Not implemented");
    }

    disableVideoStream(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    enableTimeLapse(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    disableTimeLapse(args: SdcpBasicArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    uploadFile(args: UploadFileArgs): Promise<SdcpResponse> {
        throw new Error("Not implemented");
    }

    private getBodyRequest(options: { args: SdcpBasicArgs; command: number; requestId: string; data: any }) {
        const { args, requestId, data, command } = options;

        return {
            Id: args.id,
            Data: {
                Cmd: command,
                Data: data,
                RequestID: requestId,
                MainboardID: args.mainboardId,
                TimeStamp: Date.now(),
                From: SDCP_FROM_WEB,
            },
            Topic: `sdcp/request/${args.mainboardId}`,
        };
    }

    private awaitRequestResponse<T extends SdcpRequestResponse<T["Data"]["Data"]>>(
        ws: WebsocketConnection,
        requestId: string,
        codec: Codec<T["Data"]["Data"]>
    ): Promise<T> {
        const listener = new Promise<T>((resolve, reject) => {
            const logger: Logger<T> = {
                onMessage: message => {
                    const Codec = getResponseCodec(codec);
                    Codec.decode(message.data).ifRight(res => {
                        if (res.Data.RequestID === requestId) {
                            removeLoggerFunc();
                            resolve(message.data);
                        }
                    });
                },
                onError: error => {
                    console.error("Error while awaiting " + requestId + " listener", error);
                    removeLoggerFunc();
                    reject(error);
                },
            };

            const removeLoggerFunc = ws.addLogger(logger).removeListeners;
        });

        return listener;
    }

    private awaitStatusResponse(ws: WebsocketConnection): Promise<StatusCodec> {
        const listener = new Promise<StatusCodec>((resolve, reject) => {
            const logger: Logger<StatusCodec> = {
                onMessage: message => {
                    StatusCodec.decode(message.data).ifRight(res => {
                        removeLoggerFunc();
                        resolve(res);
                    });
                },
                onError: error => {
                    console.error("Error while awaiting STATUS listener", error);
                    removeLoggerFunc();
                    reject(error);
                },
            };

            const removeLoggerFunc = ws.addLogger(logger).removeListeners;
        });

        return listener;
    }
}

/**
 * Converts the current timestamp to a hexadecimal string.
 *
 * @returns {string} The current timestamp in hexadecimal format.
 */
function nowToHex() {
    return Date.now().toString(16);
}
