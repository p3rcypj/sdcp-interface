/* ********* *
 * CMD CODES *
 * ********* */

export const CMD_STATUS_REFRESH = 0;
export const CMD_ATTRIBUTES = 1;
export const CMD_START_PRINT = 128;
export const CMD_PAUSE_PRINT = 129;
export const CMD_STOP_PRINT = 130;
export const CMD_RESUME_PRINT = 131;
export const CMD_STOP_FEEDING_MATERIAL = 132;
export const CMD_SKIP_PREHEATING = 133;
export const CMD_CHANGE_PRINTER_NAME = 192;
export const CMD_TERMINATE_FILE_TRANSFER = 255;
export const CMD_GET_FILE_LIST = 258;
export const CMD_BATCH_DELETE_FILES = 259;
export const CMD_GET_HISTORICAL_TASKS = 320;
export const CMD_GET_TASK_DETAILS = 321;
export const CMD_TOGGLE_VIDEO_STREAM = 386;
export const CMD_TOGGLE_TIME_LAPSE = 387;

/* ************ *
 * STATUS CODES *
 * ************ */

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

/* ********* *
 * ACK CODES *
 * ********* */

// Terminate File Transfer Ack
export const SDCP_FILE_TRANSFER_ACK_OK = 0; // Success
export const SDCP_FILE_TRANSFER_ACK_NOT_TRANSFER = 1; // The printer is not currently transferring files.
export const SDCP_FILE_TRANSFER_ACK_CHECKING = 2; // The printer is already in the file verification phase.
export const SDCP_FILE_TRANSFER_ACK_NOT_FOUND = 3; // File not found.

// Start Print Ack
export const SDCP_PRINT_CTRL_ACK_OK = 0; // OK
export const SDCP_PRINT_CTRL_ACK_BUSY = 1; // Busy
export const SDCP_PRINT_CTRL_ACK_NOT_FOUND = 2; // File Not Found
export const SDCP_PRINT_CTRL_ACK_MD5_FAILED = 3; // MD5 Verification Failed
export const SDCP_PRINT_CTRL_ACK_FILEIO_FAILED = 4; // File Read Failed
export const SDCP_PRINT_CTRL_ACK_INVLAID_RESOLUTION = 5; // Resolution Mismatch
export const SDCP_PRINT_CTRL_ACK_UNKNOW_FORMAT = 6; // Unrecognized File Format
export const SDCP_PRINT_CTRL_ACK_UNKNOW_MODEL = 7; // Machine Model Mismatch

// Toggle Video Stream Ack
export const SDCP_VIDEO_STREAM_ACK_OK = 0;
export const SDCP_VIDEO_STREAM_ACK_MAX_LIMIT = 1;
export const SDCP_VIDEO_STREAM_ACK_CAMERA_NOT_EXIST = 2;
export const SDCP_VIDEO_STREAM_ACK_UNKNOWN_ERROR = 3;

/* *********** *
 * ERROR CODES *
 * *********** */

// Task Details ErrorStatusReason
export const SDCP_PRINT_CAUSE_OK = 0; // Normal
export const SDCP_PRINT_CAUSE_TEMP_ERROR = 1; // Over-temperature
export const SDCP_PRINT_CAUSE_CALIBRATE_FAILED = 2; // Strain Gauge Calibration Failed
export const SDCP_PRINT_CAUSE_RESIN_LACK = 3; // Resin Level Low Detected
export const SDCP_PRINT_CAUSE_RESIN_OVER = 4; // The volume of resin required by the model exceeds the maximum capacity of the resin vat
export const SDCP_PRINT_CAUSE_PROBE_FAIL = 5; // No Resin Detected
export const SDCP_PRINT_CAUSE_FOREIGN_BODY = 6; // Foreign Object Detected
export const SDCP_PRINT_CAUSE_LEVEL_FAILED = 7; // Auto-leveling Failed
export const SDCP_PRINT_CAUSE_RELEASE_FAILED = 8; // Model Detachment Detected
export const SDCP_PRINT_CAUSE_SG_OFFLINE = 9; // Strain Gauge Not Connected
export const SDCP_PRINT_CAUSE_LCD_DET_FAILED = 10; // LCD Screen Connection Abnormal
export const SDCP_PRINT_CAUSE_RELEASE_OVERCOUNT = 11; // The cumulative release film usage has reached the maximum value
export const SDCP_PRINT_CAUSE_UDISK_REMOVE = 12; // USB drive detected as removed, printing has been stopped
export const SDCP_PRINT_CAUSE_HOME_FAILED_X = 13; // Detection of X-axis motor anomaly, printing has been stopped
export const SDCP_PRINT_CAUSE_HOME_FAILED_Z = 14; // Detection of Z-axis motor anomaly, printing has been stopped
export const SDCP_PRINT_CAUSE_RESIN_ABNORMAL_HIGH = 15; // The resin level has been detected to exceed the maximum value, and printing has been stopped
export const SDCP_PRINT_CAUSE_RESIN_ABNORMAL_LOW = 16; // Resin level detected as too low, printing has been stopped
export const SDCP_PRINT_CAUSE_HOME_FAILED = 17; // Home position calibration failed, please check if the motor or limit switch is functioning properly
export const SDCP_PRINT_CAUSE_PLAT_FAILED = 18; // A model is detected on the platform; please clean it and then restart printing
export const SDCP_PRINT_CAUSE_ERROR = 19; // Printing Exception
export const SDCP_PRINT_CAUSE_MOVE_ABNORMAL = 20; // Motor Movement Abnormality
export const SDCP_PRINT_CAUSE_AIC_MODEL_NONE = 21; // No model detected, please troubleshoot
export const SDCP_PRINT_CAUSE_AIC_MODEL_WARP = 22; // Warping of the model detected, please investigate
export const SDCP_PRINT_CAUSE_HOME_FAILED_Y = 23; // Deprecated
export const SDCP_PRINT_CAUSED_FILE_ERROR = 24; // Error File
export const SDCP_PRINT_CAUSED_CAMERA_ERROR = 25; // Camera Error. Please check if the camera is properly connected, or you can also disable this feature to continue printing
export const SDCP_PRINT_CAUSED_NETWORK_ERROR = 26; // Network Connection Error. Please check if your network connection is stable, or you can also disable this feature to continue printing
export const SDCP_PRINT_CAUSED_SERVER_CONNECT_FAILED = 27; // Server Connection Failed. Please contact our customer support, or you can also disable this feature to continue printing
export const SDCP_PRINT_CAUSED_DISCONNECT_APP = 28; // This printer is not bound to an app. To perform time-lapse photography, please first enable the remote control feature, or you can also disable this feature to continue printing
export const SDCP_PIRNT_CAUSED_CHECK_AUTO_RESIN_FEEDER = 29; // lease check the installation of the "automatic material extraction / feeding machine"
export const SDCP_PRINT_CAUSED_CONTAINER_RESIN_LOW = 30; // The resin in the container is running low. Add more resin to automatically close this notification, or click "Stop Auto Feeding" to continue printing
export const SDCP_PRINT_CAUSED_BOTTLE_DISCONNECT = 31; // Please ensure that the automatic material extraction/feeding machine is correctly installed and the data cable is connected
export const SDCP_PRINT_CAUSED_FEED_TIMEOUT = 32; // Automatic material extraction timeout, please check if the resin tube is blocked
export const SDCP_PRINT_CAUSE_TANK_TEMP_SENSOR_OFFLINE = 33; // Resin vat temperature sensor not connected
export const SDCP_PRINT_CAUSE_TANK_TEMP_SENSOR_ERRO = 34; // Resin vat temperature sensor indicates an over-temperature condition

// Upload File
export const SDCP_UPLOAD_FILE_OFFSET_ERROR = -1; // Illegal file offset value (less than 0)
export const SDCP_UPLOAD_FILE_OFFSET_NOT_MATCH = -2; // File offset does not match the current file
export const SDCP_UPLOAD_FILE_OPEN_FAILED = -3; // File cannot be opened
export const SDCP_UPLOAD_FILE_UNKOWN_ERROR = -4; // Other Unknown Errors

// Unsure / Unclear, lack of documentation (https://github.com/cbd-tech/SDCP-Smart-Device-Control-Protocol-V3.0.0/blob/main/SDCP(Smart%20Device%20Control%20Protocol)_V3.0.0_EN.md#errorcode)
export const SDCP_ERROR_CODE_MD5_FAILED = 1; // File Transfer MD5 Check Failed
export const SDCP_ERROR_CODE_FORMAT_FAILED = 2; // File format is incorrect

/* ******** *
 * RESPONSE *
 * ******** */

// From

/* export const SDCP_FROM_PC = 0; // Local PC Software Local Area Network
 * export const SDCP_FROM_WEB_PC = 1; // PC Software via WEB
 * export const SDCP_FROM_WEB = 2; // Web Client
 * export const SDCP_FROM_APP = 3; // APP
 * export const SDCP_FROM_SERVER = 4; // Server */

export const SDCP_FROM_WEB = 2; // Web Client
