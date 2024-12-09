import React, { useContext } from "react";
import { CompositionRoot, getCompositionRoot } from "../../CompositionRoot";
import { Connections } from "../hooks/useConnections";

export interface AppContextState {
    compositionRoot: CompositionRoot;
    connections: Connections;
}

export const defaultAppContext: AppContextState = {
    compositionRoot: getCompositionRoot(),
    connections: {
        items: [],
        add: () => {},
        remove: () => {},
        getById: (_id: string) => {
            throw new Error("App context not initialized");
        },
        getByHost: (_host: string) => {
            throw new Error("App context not initialized");
        },
    },
};

export const AppContext = React.createContext<AppContextState>(defaultAppContext);

export function useAppContext() {
    return useContext(AppContext);
}
