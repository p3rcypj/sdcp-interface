import React, { useContext } from "react";
import { CompositionRoot, getCompositionRoot } from "../../CompositionRoot";

interface AppContextState {
    compositionRoot: CompositionRoot;
}

export const defaultAppContext: AppContextState = {
    compositionRoot: getCompositionRoot(),
};

export const AppContext = React.createContext<AppContextState>(defaultAppContext);

export function useAppContext() {
    return useContext(AppContext);
}
