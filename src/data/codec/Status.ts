import { number, array, string, Codec, GetType } from "purify-ts";
import { PrinterStatus } from "../../domain/entities/Printer";

// Topic: "sdcp/status/${MainboardID}";

export const StatusCodec = Codec.interface({
    Status: Codec.interface({
        CurrentStatus: array(number), // Current Machine Status
        // NOT IN STATUS RESPONSE: PreviousStatus: number, // Previous Machine Status
        PrintScreen: number, // Total Exposure Screen Usage Time(s)
        ReleaseFilm: number, // Total Release Film Usage Count
        TempOfUVLED: number, // Current UVLED Temperature（℃）
        TimeLapseStatus: number, // Time-lapse Photography Switch Status. 0: Off, 1: On
        // NOT IN STATUS RESPONSE: "TempTargetBox": 0,  // Target Enclosure Temperature（℃）
        PrintInfo: Codec.interface({
            Status: number, // Printing Sub-status
            CurrentLayer: number, // Current Printing Layer
            TotalLayer: number, // Total Number of Print Layers
            CurrentTicks: number, // Current Print Time (ms)
            TotalTicks: number, // Estimated Total Print Time(ms)
            Filename: string, // Print File Name
            ErrorNumber: number, // Refer to the following text
            TaskId: string, // Current Task ID
        }),
    }),
    MainboardID: string, // Motherboard ID
    TimeStamp: number, // Timestamp
    Topic: string, // Topic, used to distinguish the type of reported message
});

export function getPrinterStatus(codec: StatusCodec): PrinterStatus {
    const { Status } = codec;

    return {
        currentStatus: Status.CurrentStatus,
        printScreen: Status.PrintScreen,
        releaseFilm: Status.ReleaseFilm,
        tempOfUVLED: Status.TempOfUVLED,
        timeLapseStatus: Status.TimeLapseStatus,
        printInfo: {
            status: Status.PrintInfo.Status,
            currentLayer: Status.PrintInfo.CurrentLayer,
            totalLayer: Status.PrintInfo.TotalLayer,
            currentTicks: Status.PrintInfo.CurrentTicks,
            totalTicks: Status.PrintInfo.TotalTicks,
            filename: Status.PrintInfo.Filename,
            errorNumber: Status.PrintInfo.ErrorNumber,
            taskId: Status.PrintInfo.TaskId,
        },
    };
}

export type StatusCodec = GetType<typeof StatusCodec>;
