import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AppContext, defaultAppContext } from "./context";
import { darkgrey } from "../../utils/colors";
import { Connection } from "../connection/Connection";

export const App = React.memo(() => {
    const [appContext, _setAppContext] = React.useState(defaultAppContext);

    return (
        <AppContext.Provider value={appContext}>
            <Box display="flex" height="100vh" bgcolor={darkgrey[600]}>
                <Form />
            </Box>
            <Watermark />
        </AppContext.Provider>
    );
});

const Form = React.memo(() => {
    const theme = useTheme();

    const [file, setFile] = React.useState<File>();
    const [uuid, setUuid] = React.useState<string>("");

    // const uploadFile = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!fileInput.current || !uuid.current) return;

    //     const files = fileInput.current.files;
    //     if (!files) return;

    //     const file = files[0];

    //     const uuid = uuid.current.value;
    //     const check = document.getElementById("check").checked ? "1" : "0";
    //     const totalSize = file.size;
    //     const chunkSize = 1024 * 1024; // 1MB per chunk
    //     let offset = 0;

    //     // Function to upload each chunk
    //     async function uploadChunk(chunk, offset) {
    //         const binaryData = await blobToUint8Array(chunk);
    //         const formData = new FormData();
    //         formData.append("S-File-MD5", "ffffffffffffffffffffffffffffffff");
    //         formData.append("Check", check);
    //         formData.append("Offset", offset);
    //         formData.append("Uuid", uuid);
    //         formData.append("TotalSize", totalSize);
    //         formData.append("File", binaryData);

    //         try {
    //             const response = await fetch("http://192.168.1.128:3030/uploadFile/upload", {
    //                 method: "POST",
    //                 mode: "no-cors",
    //                 body: formData,
    //             });
    //             const result = await response.json();
    //             if (!result.success) {
    //                 throw new Error(`Error: ${result.code}`);
    //             }

    //             console.log(`Chunk at offset ${offset} uploaded successfully.`);
    //         } catch (error) {
    //             console.error(`Failed to upload chunk at offset ${offset}:`, error);
    //             throw error;
    //         }
    //     }

    //     // Loop through the file and send chunks
    //     while (offset < totalSize) {
    //         const chunk = file.slice(offset, offset + chunkSize);
    //         await uploadChunk(chunk, offset);
    //         offset += chunkSize;
    //     }

    //     alert("File uploaded successfully in chunks!");
    // }, []);

    return (
        <form id="uploadForm">
            <Box display="flex" flexDirection="column" padding={theme.spacing(4)} rowGap={theme.spacing(2)}>
                <Connection />
                {/* <input type="file" ref={fileInput} name="file" required /> */}
                {/* <input type="text" name="uuid" required value={uuid} />
                <input type="checkbox" id="check" name="check" value="0" checked />
                <button type="submit" onClick={uploadFile}>
                    Upload
                </button> */}
            </Box>
        </form>
    );
});

const Watermark: React.FC = () => {
    const theme = useTheme();
    return (
        <Box position="fixed" left={theme.spacing(2)} bottom={theme.spacing(1)}>
            <Typography variant="h6" color="textDisabled">
                SDCP Interface
            </Typography>
        </Box>
    );
};

// function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onloadend = function () {
//             if (reader.result) resolve(new Uint8Array(reader.result as ArrayBuffer));
//             else reject("Error reading the Blob.");
//         };

//         reader.onerror = function () {
//             reject("Error reading the Blob.");
//         };

//         reader.readAsArrayBuffer(blob);
//     });
// }

// async function hashBlob(blob: Blob, algorithm: string = "md5"): Promise<string> {
//     const reader = blob.stream().getReader();
//     const chunks: Uint8Array[] = [];

//     // Leer los datos del Blob como partes
//     async function read(): Promise<void> {
//         const { done, value } = await reader.read();
//         if (done) return;
//         if (value) chunks.push(value);
//         await read();
//     }

//     await read();

//     // Combinar las partes y generar el hash
//     const buffer = Buffer.concat(chunks);
//     const hash = createHash(algorithm).update(buffer).digest("hex");
//     return hash;
// }
