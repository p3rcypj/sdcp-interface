export type Logger = {
    onMessage: (message: Message) => void;
    onError: (error: MessageError) => void;
};

type MessageError = {
    reason: string;
    data: any;
};

type Message = {
    type: "info" | "success";
    message: string;
    data: any;
};
