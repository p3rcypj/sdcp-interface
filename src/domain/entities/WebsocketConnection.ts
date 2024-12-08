import { Maybe } from "../../utils/ts-utils";
import { Logger } from "./generic/Logger";

export class WebsocketConnection extends EventTarget {
    static NORMAL_CLOSURE = 1000;
    static GOING_AWAY = 1001;
    static PROTOCOL_ERROR = 1002;
    static UNSUPPORTED_DATA = 1003;
    static PORT = 3030;

    private ws: WebSocket;
    private host: string;
    private port: number;
    private logger?: Logger;
    private status: "connected" | "disconnected" = "disconnected";
    private id: string;
    private startTime: Maybe<number> = undefined;

    constructor(host: string, port: number, logger?: Logger) {
        super();
        this.host = host;
        this.port = port;
        this.logger = logger;
        this.id = Date.now().toString();
        this.ws = this.connect();
    }

    connect(): WebSocket {
        if (this.status === "connected") {
            this.logger?.onMessage({
                type: "info",
                message: `Connection already exists`,
                data: this.getTarget(),
            });

            return this.ws;
        } else {
            const ws = new WebSocket(`ws://${this.host}:${this.port}/websocket`);
            this.attachListeners(ws);

            return ws;
        }
    }

    send(message: any) {
        this.ws.send(JSON.stringify(message));
    }

    close() {
        this.ws.close(WebsocketConnection.NORMAL_CLOSURE, "Closing connection");
    }

    getId() {
        return this.id;
    }

    getTarget() {
        return { host: this.host, port: this.port };
    }

    getStatus() {
        return this.status;
    }

    getElapsedTime() {
        return this.startTime ? Date.now() - this.startTime : 0;
    }

    ping() {
        const pingMessage = {
            cmd: "ping",
            id: this.id,
            data: {},
        };

        this.ws.send(JSON.stringify(pingMessage));
    }

    private attachListeners(ws: WebSocket) {
        ws.onopen = () => {
            this.status = "connected";
            this.dispatchEvent(new Event("statusChange"));
            this.startTime = Date.now();

            this.logger?.onMessage({
                type: "success",
                message: "Connection established",
                data: undefined,
            });

            setTimeout(() => {
                this.close();
            }, 10000);
        };

        ws.onmessage = event => {
            this.logger?.onMessage({
                type: "info",
                message: "Received message",
                data: JSON.parse(event.data),
            });
        };

        ws.onerror = error => {
            this.logger?.onError({
                reason: "Websocket error",
                data: error,
            });
        };

        ws.onclose = event => {
            this.status = "disconnected";
            this.dispatchEvent(new Event("statusChange"));
            this.startTime = undefined;

            switch (event.code) {
                case WebsocketConnection.NORMAL_CLOSURE:
                    this.logger?.onMessage({
                        type: "info",
                        message: "Connection closed",
                        data: event,
                    });
                    break;
                case WebsocketConnection.GOING_AWAY:
                    this.logger?.onMessage({
                        type: "info",
                        message: "Connection going away",
                        data: event,
                    });
                    break;
                case WebsocketConnection.PROTOCOL_ERROR:
                    this.logger?.onError({
                        reason: "Connection closed due to protocol error",
                        data: event,
                    });
                    break;
                case WebsocketConnection.UNSUPPORTED_DATA:
                    this.logger?.onError({
                        reason: "Connection closed due to unsupported data",
                        data: event,
                    });
                    break;
                default:
                    this.logger?.onError({
                        reason: "Unexpected close code: " + event.code,
                        data: event,
                    });
            }
        };
    }
}
