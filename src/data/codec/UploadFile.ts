import { number, string, Codec, GetType, nullable, oneOf, array, boolean, exactly } from "purify-ts";

export const UploadFileCodec = Codec.interface({
    code: string,
    messages: nullable(
        array(
            oneOf([
                Codec.interface({
                    field: exactly("common_field"),
                    message: number,
                }),
                Codec.interface({
                    field: string,
                    message: string,
                }),
            ])
        )
    ),
    data: Codec.interface({}),
    success: boolean,
});

export type UploadFileCodec = GetType<typeof UploadFileCodec>;

/* {
 *     "field": "common_field",
 *     "message": 100001  // When the field name is set to "common_field", the value of the message is the error code.
 * },
 * {
 *     "field": "filename",
 *     "message": "Cannot be empty"  // Field Validation Failure Reasons
 * }
 */

// Several error codes in codes file
