import { Codec, string, number, GetType, array, maybe } from "purify-ts/Codec";

// Topic: "sdcp/response/${MainboardID}"

export const BasicAckCodec = Codec.interface({
    Ack: number, // 0 represents success, other details are provided in codes file.
});

export const RetrieveFileListCodec = Codec.interface({
    Ack: number, // 0 represents success
    FileList: array(
        Codec.interface({
            name: string, // Indicates the current file or folder path.
            usedSize: number, // Used Storage Space
            totalSize: number, // Total Storage Space
            storageType: number, // 0: Internal Storage, 1: External Storage
            type: number, // 0: Folder 1: File
        })
    ), // File list
});

export const BatchDeleteFilesCodec = Codec.interface({
    Ack: number, // 0 represents success
    ErrData: maybe(array(string)), // Files that failed to be deleted; if there are no failures, no return is necessary
});

export const HistoricalTasksCodec = Codec.interface({
    Ack: number,
    HistoryData: array(string), // An ordered list of historical records, where the array elements are the taskid (UUID) of the historical records.
});

export const TaskDetailsCodec = Codec.interface({
    Ack: number, // 0 represents success
    HistoryDetailList: array(
        Codec.interface({
            Thumbnail: string, // Thumbnail Address
            TaskName: string, // Task Name
            BeginTime: number, // Start Time (Timestamp in Seconds)
            EndTime: number, // End Time (Timestamp in Seconds)
            TaskStatus: number, // Task Status (0: Other Status, 1: Completed, 2: Exceptional Status, 3: Stopped)
            SliceInformation: Codec.interface({}), // TODO: No info in docs. Check yourself. Slice Information
            AlreadyPrintLayer: number, // Printed Layer Count
            TaskId: string, // Task ID
            MD5: string, // MD5 of the Sliced File
            CurrentLayerTalVolume: number, // Total Volume of Printed Layers(ml)
            TimeLapseVideoStatus: number, // Time-lapse photography status, 0: Not shot, 1: Time-lapse photography file exists, 2: Deleted, 3: Generating, 4: Generation failed.
            TimeLapseVideoUrl: string, // URL for the time-lapse photography video
            ErrorStatusReason: number, // Status Code, refer to the codes file.
        })
    ),
});

export const ToggleVideoStreamCodec = Codec.interface({
    Ack: number, // 0: Success 1: Exceeded maximum simultaneous streaming limit 2: Camera does not exist 3: Unknown error
    VideoUrl: string, //When opening the video stream, return the RTSP protocol address
});

export function getResponseCodec<Data>(dataCodec: Codec<Data>): Codec<SdcpRequestResponse<Data>> {
    return Codec.interface({
        Id: string, // Machine brand identifier, 32-bit UUID
        Data: Codec.interface({
            Cmd: number, // Request Command.
            Data: dataCodec,
            RequestID: string, // Request ID
            MainboardID: string, // Motherboard ID
            TimeStamp: number, // Timestamp
        }),
        Topic: string, // Topic, used to distinguish the type of reported message
    });
}

export const BasicResponseCodec = getResponseCodec(BasicAckCodec);
export const RetrieveFileListResponseCodec = getResponseCodec(RetrieveFileListCodec);
export const BatchDeleteFilesResponseCodec = getResponseCodec(BatchDeleteFilesCodec);
export const HistoricalTasksResponseCodec = getResponseCodec(HistoricalTasksCodec);
export const TaskDetailsResponseCodec = getResponseCodec(TaskDetailsCodec);
export const ToggleVideoStreamResponseCodec = getResponseCodec(ToggleVideoStreamCodec);

export type Ack = {
    Ack: number;
};

export type BasicAckResponse = GetType<typeof BasicResponseCodec>;
export type RetrieveFileListResponse = GetType<typeof RetrieveFileListResponseCodec>;
export type BatchDeleteFilesResponse = GetType<typeof BatchDeleteFilesResponseCodec>;
export type HistoricalTasksResponse = GetType<typeof HistoricalTasksResponseCodec>;
export type TaskDetailsResponse = GetType<typeof TaskDetailsResponseCodec>;
export type ToggleVideoStreamResponse = GetType<typeof ToggleVideoStreamResponseCodec>;

export type SdcpRequestResponse<Ack> = {
    Id: string;
    Data: { Cmd: number; Data: Ack; RequestID: string; MainboardID: string; TimeStamp: number };
    Topic: string;
};
