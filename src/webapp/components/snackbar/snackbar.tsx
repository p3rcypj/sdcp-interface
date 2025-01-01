import { useState, ReactNode } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import { SnackbarContext, SnackbarOptions } from "./snackbarContext";

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [position, setPosition] = useState<SnackbarOrigin>({ vertical: "top", horizontal: "center" });
    const [duration, setDuration] = useState<number | null>(null);

    const showMessage = (message: string, options?: SnackbarOptions) => {
        setMessage(message);
        setPosition(options?.position || { vertical: "top", horizontal: "center" });
        setDuration(options?.duration || 3000);
        setOpen(true);
    };

    const hideMessage = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showMessage, hideMessage }}>
            {children}
            <Snackbar
                anchorOrigin={position}
                open={open}
                onClose={hideMessage}
                message={message}
                autoHideDuration={duration}
            />
        </SnackbarContext.Provider>
    );
};
