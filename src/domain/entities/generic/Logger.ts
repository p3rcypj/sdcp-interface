export type Logger<Data = any> = {
    onMessage: (message: Message<Data>) => void;
    onError: (error: MessageError) => void;
};

type MessageError = {
    reason: string;
    data: any;
};

type Message<Data> = {
    type: "info" | "success";
    message: string;
    data: Data;
};
