import { createContext, useContext } from "react";
import { SnackbarOrigin } from "@mui/material";

export interface SnackbarContextState {
    showMessage: (message: string, options?: SnackbarOptions) => void;
    hideMessage: () => void;
}

export interface SnackbarOptions {
    duration?: number;
    position?: SnackbarOrigin;
}

export const SnackbarContext = createContext<SnackbarContextState | undefined>(undefined);

export const useSnackbar = (): SnackbarContextState => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};
