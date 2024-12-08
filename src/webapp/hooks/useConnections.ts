import React from "react";
import { Id } from "../../domain/entities/Printer";
import { WebsocketConnection } from "../../domain/entities/WebsocketConnection";
import { Maybe } from "../../utils/ts-utils";

export type Connections = {
    items: WebsocketConnection[];
    add: (connection: WebsocketConnection) => void;
    remove: (id: Id) => void;
    getById: (id: Id) => Maybe<WebsocketConnection>;
    getByHost: (host: string) => Maybe<WebsocketConnection>;
};

export function useConnections(): Connections {
    const [connections, setConnections] = React.useState<WebsocketConnection[]>([]);

    const addConnection = React.useCallback((connection: WebsocketConnection) => {
        setConnections(prev => [...prev, connection]);
    }, []);

    const removeConnection = React.useCallback((id: Id) => {
        setConnections(prev => prev.filter(c => c.getId() !== id));
    }, []);

    const getById = React.useCallback((id: Id) => connections.find(c => c.getId() === id), [connections]);

    const getByHost = React.useCallback(
        (host: string) => connections.find(c => c.getTarget().host === host),
        [connections]
    );

    return {
        items: connections,
        add: addConnection,
        remove: removeConnection,
        getById: getById,
        getByHost: getByHost,
    };
}
