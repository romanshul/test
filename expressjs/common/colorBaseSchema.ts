import { Types } from "ts-openapi";

export const colorSchema = Types.Object({
    description: "Color info",
    properties: {
        id: Types.Integer({ description: "Color ID" }),
        name: Types.String({
            description: "color name like Pink, Red, Black...",
            maxLength: 100,
            required: true,
        }),
        code: Types.String({
            description: "color hex code like #ffffff",
            maxLength: 100,
            required: true,
        }),
        group_id: Types.Integer({
            description: "Color group ID"
        })
    },
    modelName: "Colors",
})

export const errorSchema = Types.Object({
    description: "Error Object",
    properties: {
        code: Types.Integer({ description: "Error Code" }),
        errorId: Types.Uuid({ description: "Support Unique Error ID" }),
        errorDetails: Types.Array({
            arrayType: Types.String(),
            description: "Error List",
        }),
    },
    example: {
        code: "121",
        errorId: "3520c143-983b-42a4-8c08-0f3e0bbdfb29",
        errorDetails: ["Name is mandatory.", "Unknown error"],
    },
    modelName: "ErrorResponse",
})