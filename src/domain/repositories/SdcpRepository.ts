import { Maybe } from "../../utils/ts-utils";
import { PrinterAttributes, PrinterFile, PrinterStatus } from "../entities/Printer";
import { Task } from "../entities/Task";
import { WebsocketConnection } from "../entities/WebsocketConnection";

// TODO: instead of simply making requests, develop responses to align needs of the application
export interface SdcpRepository {
    discover(): Promise<void>; // TODO: with a simple express api that sends the udp message
    ping(): Promise<"pong">;
    getAttributes(args: SdcpBasicArgs): Promise<PrinterAttributes>;
    getStatus(args: SdcpBasicArgs): Promise<PrinterStatus>;
    terminateFileTransfer(args: TerminateFileTransferArgs): Promise<SdcpResponse>;
    refreshStatus(args: SdcpBasicArgs): Promise<SdcpResponse>;
    startPrint(args: StartPrintArgs): Promise<SdcpResponse>;
    pausePrint(args: SdcpBasicArgs): Promise<SdcpResponse>;
    stopPrint(args: SdcpBasicArgs): Promise<SdcpResponse>;
    resumePrint(args: SdcpBasicArgs): Promise<SdcpResponse>;
    stopFeedingMaterial(args: SdcpBasicArgs): Promise<SdcpResponse>;
    skipPreheating(args: SdcpBasicArgs): Promise<SdcpResponse>;
    changePrinterName(args: SdcpBasicArgs & { name: string }): Promise<SdcpResponse>;
    getFileList(args: SdcpBasicArgs & { url: string }): Promise<SdcpResponse<{ filelist: PrinterFile[] }>>;
    batchDeleteFiles(args: BatchDeleteFilesArgs): Promise<SdcpResponse<{ errFiles: string[] }>>;
    getHistoricalTasks(args: SdcpBasicArgs): Promise<SdcpResponse<{ taskIds: string[] }>>;
    getTaskDetails(args: SdcpBasicArgs & { id: string[] }): Promise<SdcpResponse<{ task: Task }>>;
    enableVideoStream(args: SdcpBasicArgs): Promise<SdcpResponse<{ rstpUrl: string }>>;
    disableVideoStream(args: SdcpBasicArgs): Promise<SdcpResponse>;
    enableTimeLapse(args: SdcpBasicArgs): Promise<SdcpResponse>;
    disableTimeLapse(args: SdcpBasicArgs): Promise<SdcpResponse>;
    uploadFile(args: UploadFileArgs): Promise<SdcpResponse>;
}

export type SdcpBasicArgs = {
    id: string; // 32-bit UUID
    mainboardId: string;
    ws: WebsocketConnection;
};

export type TerminateFileTransferArgs = SdcpBasicArgs & {
    uuid: string;
    filename: string;
};

export type StartPrintArgs = SdcpBasicArgs & {
    filename: string;
    startLayer: number;
};

export type BatchDeleteFilesArgs = SdcpBasicArgs & {
    filelist: Maybe<string[]>;
    folderlist: Maybe<string[]>;
};

export type UploadFileArgs = {
    mainboardId: string;
    md5: string; // The MD5 generated for the file is used to verify the correctness of the file.
    check: boolean; // Whether to enable file verification 0:disable 1:enable
    offset: number; // Offset
    uuid: string; // The UUID for each packet is the same
    totalSize: number; //Total Size
    file: Blob; // Binary data
};

type SuccessResponse<Data = undefined> = {
    type: "success";
    code: 0;
    data: Data;
};

type MessageResponse = {
    type: "error" | "warning" | "critical" | "wait" | "info";
    code: number;
    reason?: string; // Optional key, only present if type is error, warning, critical, wait, or info
};

export type SdcpResponse<Data = undefined> = SuccessResponse<Data> | MessageResponse;
