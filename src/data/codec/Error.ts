import { number, string, Codec, GetType } from "purify-ts";

// Topic: "sdcp/error/${MainboardID}"

export const ErrorCodec = Codec.interface({
    Id: string, // Machine brand identifier, 32-bit UUID
    Data: Codec.interface({
        Data: Codec.interface({
            ErrorCode: string, // TODO: Check if not number. Error Code, please refer to the error code definition.
        }),
        MainboardID: string, // Motherboard ID
        TimeStamp: number, // Timestamp
    }),
    Topic: string, // Topic, used to distinguish the types of reported messages
});

export type ErrorCodec = GetType<typeof ErrorCodec>;
