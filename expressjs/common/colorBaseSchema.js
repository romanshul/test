"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSchema = exports.colorSchema = void 0;
const ts_openapi_1 = require("ts-openapi");
exports.colorSchema = ts_openapi_1.Types.Object({
    description: "Color info",
    properties: {
        id: ts_openapi_1.Types.Integer({ description: "Color ID" }),
        name: ts_openapi_1.Types.String({
            description: "color name like Pink, Red, Black...",
            maxLength: 100,
            required: true,
        }),
        code: ts_openapi_1.Types.String({
            description: "color hex code like #ffffff",
            maxLength: 100,
            required: true,
        }),
        group_id: ts_openapi_1.Types.Integer({
            description: "Color group ID"
        })
    },
    modelName: "Colors",
});
exports.errorSchema = ts_openapi_1.Types.Object({
    description: "Error Object",
    properties: {
        code: ts_openapi_1.Types.Integer({ description: "Error Code" }),
        errorId: ts_openapi_1.Types.Uuid({ description: "Support Unique Error ID" }),
        errorDetails: ts_openapi_1.Types.Array({
            arrayType: ts_openapi_1.Types.String(),
            description: "Error List",
        }),
    },
    example: {
        code: "121",
        errorId: "3520c143-983b-42a4-8c08-0f3e0bbdfb29",
        errorDetails: ["Name is mandatory.", "Unknown error"],
    },
    modelName: "ErrorResponse",
});
