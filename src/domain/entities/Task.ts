export type Task = {
    thumbnail: string; // Thumbnail Address
    taskName: string; // Task Name
    beginTime: number; // Start Time (Timestamp in Seconds)
    endTime: number; // End Time (Timestamp in Seconds)
    taskStatus: number; // Task Status (0: Other Status, 1: Completed, 2: Exceptional Status, 3: Stopped)
    sliceInformation: {}; // TODO: No info in docs. Check yourself. Slice Information
    alreadyPrintLayer: number; // Printed Layer Count
    taskId: string; // Task ID
    md5: string; // MD5 of the Sliced File
    currentLayerTalVolume: number; // Total Volume of Printed Layers(ml)
    timeLapseVideoStatus: number; // Time-lapse photography status, 0: Not shot, 1: Time-lapse photography file exists, 2: Deleted, 3: Generating, 4: Generation failed.
    timeLapseVideoUrl: string; // URL for the time-lapse photography video
    errorStatusReason: number; // Status Code, refer to the error codes file.
};
