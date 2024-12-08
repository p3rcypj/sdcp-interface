import { number, array, string, Codec } from "purify-ts";

// Topic: "sdcp/status/${MainboardID}";

// PreviousStatus and CurrentStatus
export const SDCP_MACHINE_STATUS_IDLE = 0; // Idle
export const SDCP_MACHINE_STATUS_PRINTING = 1; // Executing print task
export const SDCP_MACHINE_STATUS_FILE_TRANSFERRING = 2; // File transfer in progress
export const SDCP_MACHINE_STATUS_EXPOSURE_TESTING = 3; // Exposure test in progress
export const SDCP_MACHINE_STATUS_DEVICES_TESTING = 4; //Device self-check in progress

// Print Info
export const SDCP_PRINT_STATUS_HOMING = 1; // Resetting
export const SDCP_PRINT_STATUS_DROPPING = 2; // Descending
export const SDCP_PRINT_STATUS_EXPOSURING = 3; // Exposing
export const SDCP_PRINT_STATUS_LIFTING = 4; // Lifting
export const SDCP_PRINT_STATUS_PAUSING = 5; // Executing Pause Action
export const SDCP_PRINT_STATUS_PAUSED = 6; // Suspended
export const SDCP_PRINT_STATUS_STOPPING = 7; // Executing Stop Action
export const SDCP_PRINT_STATUS_STOPED = 8; // Stopped
export const SDCP_PRINT_STATUS_COMPLETE = 9; // Print Completed
export const SDCP_PRINT_STATUS_FILE_CHECKING = 10; // File Checking in Progress

// ErrorNumber
export const SDCP_PRINT_ERROR_NONE = 0; // Normal
export const SDCP_PRINT_ERROR_CHECK = 1; // File MD5 Check Failed
export const SDCP_PRINT_ERROR_FILEIO = 2; // File Read Failed
export const SDCP_PRINT_ERROR_INVLAID_RESOLUTION = 3; // Resolution Mismatch
export const SDCP_PRINT_ERROR_UNKNOWN_FORMAT = 4; // Format Mismatch
export const SDCP_PRINT_ERROR_UNKNOWN_MODEL = 5; // Machine Model Mismatch

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
