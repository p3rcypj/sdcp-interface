export type Printer = {
    attributes: PrinterAttributes;
    id: string; // 32-bit UUID
    mainboardID: string; // Motherboard ID
};

// Device Self-Check Status
type DevicesStatus = {
    tempSensorStatusOfUVLED: number; // UVLED Temperature Sensor Status, 0: Disconnected, 1: Normal, 2: Abnormal
    lcdStatus: number; // Exposure Screen Connection Status, 0: Disconnected, 1: Connected
    sgStatus: number; // Strain Gauge Status, 0: Disconnected, 1: Normal, 2: Calibration Failed
    zMotorStatus: number; // Z-Axis Motor Connection Status, 0: Disconnected, 1: Connected
    rotateMotorStatus: number; // Rotary Axis Motor Connection Status, 0: Disconnected, 1: Connected
    releaseFilmState: number; // Release Film Status, 0: Abnormal, 1: Normal
    xMotorStatus: number; // X-Axis Motor Connection Status, 0: Disconnected, 1: Connected
};

export type PrinterAttributes = {
    name: string; // Machine Name
    machineName: string; // Machine Model
    brandName: string; // Brand Name
    protocolVersion: string; // Protocol Version
    firmwareVersion: string; // Firmware Version
    resolution: string; // Resolution
    xyzSize: string; // Maximum printing dimensions in the XYZ directions of the machine, in millimeters.(mm)
    mainboardIP: string; // Motherboard IP Address
    mainboardID: string; // Motherboard ID(16)
    numberOfVideoStreamConnected: number; // Number of Connected Video Streams
    maximumVideoStreamAllowed: number; // Maximum Number of Connections for Video Streams
    networkStatus: "wlan" | "eth"; // Network Connection Status, WiFi/Ethernet Port
    usbDiskStatus: number; // USB Drive Connection Status. 0: Disconnected, 1: Connected
    capabilities: string[]; // Supported Sub-protocols on the Motherboard
    supportFileType: string[]; // Supported File Types
    devicesStatus: DevicesStatus;
    releaseFilmMax: number; // Maximum number of uses (service life) for the release film
    tempOfUVLEDMax: number; // Maximum operating temperature for UVLED(℃)
    cameraStatus: number; // Camera Connection Status, 0: Disconnected, 1: Connected
    remainingMemory: number; // Remaining File Storage Space Size(bit)
    tlpNoCapPos: number; // Model height threshold for not performing time-lapse photography (mm)
    tlpStartCapPos: number; // The print height at which time-lapse photography begins (mm)
    tlpInterLayers: number; // Time-lapse photography shooting interval layers
};

type PrintInfo = {
    status: number; // Printing Sub-status
    currentLayer: number; // Current Printing Layer
    totalLayer: number; // Total Number of Print Layers
    currentTicks: number; // Current Print Time (ms)
    totalTicks: number; // Estimated Total Print Time(ms)
    filename: string; // Print File Name
    errorNumber: number; // Refer to the following text
    taskId: string; // Current Task ID
};

export type PrinterStatus = {
    currentStatus: number[]; // Current Machine Status
    printScreen: number; // Total Exposure Screen Usage Time(s)
    releaseFilm: number; // Total Release Film Usage Count
    tempOfUVLED: number; // Current UVLED Temperature（℃）
    timeLapseStatus: number; // Time-lapse Photography Switch Status. 0: Off, 1: On
    printInfo: PrintInfo;
};

export type PrinterFile = {
    name: string; // Indicates the current file or folder path.
    usedSize: number; // Used Storage Space
    totalSize: number; // Total Storage Space
    storageType: number; // 0: Internal Storage, 1: External Storage
    type: number; // 0: Folder 1: File
};
