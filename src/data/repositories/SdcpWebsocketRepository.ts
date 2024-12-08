// https://github.com/cbd-tech/SDCP-Smart-Device-Control-Protocol-V3.0.0/blob/main/SDCP(Smart%20Device%20Control%20Protocol)_V3.0.0_EN.md

import { PrinterAttributes, PrinterFile, PrinterStatus } from "../../domain/entities/Printer";
import { Task } from "../../domain/entities/Task";
import {
    BatchDeleteFilesArgs,
    SdcpBasicArgs,
    SdcpRepository,
    SdcpResponse,
    StartPrintArgs,
    TerminateFileTransferArgs,
    UploadFileArgs,
} from "../../domain/repositories/SdcpRepository";

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
        throw new Error("Not implemented");
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
}
