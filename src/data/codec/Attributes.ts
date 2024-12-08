import { Codec, string, number, array, oneOf, exactly, GetType } from "purify-ts/Codec";

// Topic: "sdcp/attributes/${MainboardID}"

const DevicesStatusCodec = Codec.interface({
    TempSensorStatusOfUVLED: number, // UVLED Temperature Sensor Status, 0: Disconnected, 1: Normal, 2: Abnormal
    LCDStatus: number, // Exposure Screen Connection Status, 0: Disconnected, 1: Connected
    SgStatus: number, // Strain Gauge Status, 0: Disconnected, 1: Normal, 2: Calibration Failed
    ZMotorStatus: number, // Z-Axis Motor Connection Status, 0: Disconnected, 1: Connected
    RotateMotorStatus: number, // Rotary Axis Motor Connection Status, 0: Disconnected, 1: Connected
    RelaseFilmState: number, // Release Film Status, 0: Abnormal, 1: Normal
    XMotorStatus: number, // X-Axis Motor Connection Status, 0: Disconnected, 1: Connected
});

const PrinterAttributesCodec = Codec.interface({
    Name: string, // Machine Name
    MachineName: string, // Machine Model
    BrandName: string, // Brand Name
    ProtocolVersion: string, // Protocol Version
    FirmwareVersion: string, // Firmware Version
    Resolution: string, // Resolution
    XYZsize: string, // Maximum printing dimensions in the XYZ directions of the machine, in millimeters.(mm)
    MainboardIP: string, // Motherboard IP Address
    MainboardID: string, // Motherboard ID(16)
    NumberOfVideoStreamConnected: number, // Number of Connected Video Streams
    MaximumVideoStreamAllowed: number, // Maximum Number of Connections for Video Streams
    NetworkStatus: oneOf([exactly("wlan"), exactly("eth")]), // Network Connection Status, WiFi/Ethernet Port
    UsbDiskStatus: number, // USB Drive Connection Status. 0: Disconnected, 1: Connected
    Capabilities: array(string), // Supported Sub-protocols on the Motherboard
    SupportFileType: array(string), // Supported File Types
    DevicesStatus: DevicesStatusCodec,
    ReleaseFilmMax: number, // Maximum number of uses (service life) for the release film
    TempOfUVLEDMax: number, // Maximum operating temperature for UVLED(℃)
    CameraStatus: number, // Camera Connection Status, 0: Disconnected, 1: Connected
    RemainingMemory: number, // Remaining File Storage Space Size(bit)
    TLPNoCapPos: number, // Model height threshold for not performing time-lapse photography (mm)
    TLPStartCapPos: number, // The print height at which time-lapse photography begins (mm)
    TLPInterLayers: number, // Time-lapse photography shooting interval layers
});

const PrinterCodec = Codec.interface({
    Attributes: PrinterAttributesCodec,
    MainboardID: string, // Motherboard ID
    TimeStamp: number, // Timestamp
    Topic: string, // Topic, used to distinguish the type of reported message
});

export type DevicesStatusCodec = GetType<typeof DevicesStatusCodec>;
export type PrinterAttributesCodec = GetType<typeof PrinterAttributesCodec>;
export type PrinterCodec = GetType<typeof PrinterCodec>;

export { DevicesStatusCodec, PrinterAttributesCodec, PrinterCodec };
