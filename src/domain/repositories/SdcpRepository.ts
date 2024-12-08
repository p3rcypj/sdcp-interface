import { PrinterAttributes } from "../entities/Printer";

export interface SdcpRepository {
    discover(): Promise<void>; // TODO: with a simple express api that sends the udp message
    ping(): Promise<"pong">;
    getAttributes(args: AttributesArgs): Promise<PrinterAttributes>;
}

type AttributesArgs = {
    id: string; // Machine brand identifier, 32-bit UUID
    mainboardId: string; // Motherboard ID
    from?: number;
};
