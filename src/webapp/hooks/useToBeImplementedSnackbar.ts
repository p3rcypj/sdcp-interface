import { useSnackbar } from "../components/snackbar/snackbarContext";

export function useToBeImplementedSnackbar() {
    const snackbar = useSnackbar();

    return () => {
        if (process.env.NODE_ENV === "development")
            snackbar.showMessage("This feature is not implemented yet.");
    };
}
