import { number, string, Codec } from "purify-ts";

export const NoticeCodec = Codec.interface({
    Id: string, // Machine brand identifier, 32-bit UUID
    Data: Codec.interface({
        Data: Codec.interface({
            Message: string, // Can be a string, can be JSON
            Type: number, // Used to distinguish what type of notification it is, 1: History synchronization successful
        }),
        MainboardID: string, // Motherboard ID
        TimeStamp: number, // Timestamp
    }),
    Topic: string, // Topic, used to distinguish the types of reported messages
});
