"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchColor = exports.getRandomColor = exports.getColorsByGroupId = exports.getColorById = exports.getColors = void 0;
const ts_openapi_1 = require("ts-openapi");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const colorBaseSchema_1 = require("../common/colorBaseSchema");
const colorsController = require('../controllers/colorsController');
function getColors(app, openApi) {
    const requestSchema = {
        query: {
            offset: ts_openapi_1.Types.Integer({
                description: "Page number",
                default: 0,
                minValue: 0,
            }),
            limit: ts_openapi_1.Types.Integer({
                description: "Records per page",
                default: 12,
                minValue: 10,
                maxValue: 100
            })
        },
    };
    const successResponse = openApi.declareSchema("Successful Colors List Response", ts_openapi_1.Types.Object({
        description: "Successful Operation",
        properties: {
            data: ts_openapi_1.Types.Object({
                properties: {
                    count: ts_openapi_1.Types.Integer(),
                    rows: ts_openapi_1.Types.Array({
                        description: "An array of colors",
                        arrayType: colorBaseSchema_1.colorSchema
                    })
                }
            })
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.get("/get-colors", (0, validationMiddleware_1.validationMiddleware)(requestSchema), getColors_);
    // declare our API
    // openApi.declareSecurityScheme("bearerSecurity", bearerAuth());
    openApi.addPath("/get-colors", {
        get: {
            description: "",
            summary: "",
            operationId: "get-colors-api",
            requestSchema,
            responses: {
                200: successResponse,
                400: error400,
            },
            tags: ["Colors"],
        }
    }, true // make method visible
    );
}
exports.getColors = getColors;
function getColorById(app, openApi) {
    const requestSchema = {
        params: {
            id: ts_openapi_1.Types.Integer({
                description: "Color ID",
                minValue: 1,
                required: true
            })
        },
    };
    const successResponse = openApi.declareSchema("Successful Colors List Response", ts_openapi_1.Types.Object({
        description: "Color data",
        properties: { data: colorBaseSchema_1.colorSchema }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.get("/get-color/:id", (0, validationMiddleware_1.validationMiddleware)(requestSchema), getColorById_);
    // declare our API
    openApi.addPath("/get-color/:id", {
        get: {
            description: "Get colors",
            summary: "Getting color object by id",
            operationId: "getColorsApi",
            requestSchema,
            responses: {
                // here we declare the response types
                200: successResponse,
                400: error400
            },
            tags: ["Colors"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.getColorById = getColorById;
function getColorsByGroupId(app, openApi) {
    const requestSchema = {
        query: {
            offset: ts_openapi_1.Types.Integer({
                description: "Page number",
                default: 0,
                minValue: 0,
            }),
            limit: ts_openapi_1.Types.Integer({
                description: "Records per page",
                default: 12,
                minValue: 10,
                maxValue: 100
            })
        },
        params: {
            id: ts_openapi_1.Types.Integer({
                description: "Color ID",
                minValue: 1,
                required: true
            })
        }
    };
    const successResponse = openApi.declareSchema("Successful Colors List Response", ts_openapi_1.Types.Object({
        description: "Successful Operation",
        properties: {
            data: ts_openapi_1.Types.Object({
                properties: {
                    count: ts_openapi_1.Types.Integer(),
                    rows: ts_openapi_1.Types.Array({
                        arrayType: colorBaseSchema_1.colorSchema
                    })
                }
            })
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.get("/get-colors-group/:id", (0, validationMiddleware_1.validationMiddleware)(requestSchema), getColorsByGroupId_);
    // declare our API
    openApi.addPath("/get-colors-group/:id", {
        // API method
        get: {
            description: "Get colors by group ID",
            summary: "Getting colors' objects by color group id",
            operationId: "get-colors-group-id",
            requestSchema,
            responses: {
                // here we declare the response types
                200: successResponse,
                400: error400
            },
            tags: ["Colors"], // these tags group your methods in UI
        },
    }, true);
}
exports.getColorsByGroupId = getColorsByGroupId;
function getRandomColor(app, openApi) {
    const requestSchema = {
        query: {}
    };
    const successResponse = openApi.declareSchema("Successful random color Response", ts_openapi_1.Types.Object({
        description: "Successful Operation",
        properties: {
            data: colorBaseSchema_1.colorSchema
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.get("/get-random-color", (0, validationMiddleware_1.validationMiddleware)(requestSchema), (_request, response) => {
        colorsController.getRandomColor(_request, response);
    });
    // declare our API
    openApi.addPath("/get-random-color", {
        // API method
        get: {
            description: "Get random color",
            summary: "Get random color from database",
            operationId: "get-random-color-api",
            responses: {
                // here we declare the response types
                200: successResponse,
                400: error400
            },
            tags: ["Colors"], // these tags group your methods in UI
        },
    }, true);
}
exports.getRandomColor = getRandomColor;
function searchColor(app, openApi) {
    const requestSchema = {
        headers: {
            "authorization": ts_openapi_1.Types.String({
                description: "In order to use global swagger auth, the field is unnecessary",
                required: false,
            })
        },
        body: ts_openapi_1.Types.Object({
            description: "Search color by name or hex code",
            properties: {
                keyWord: ts_openapi_1.Types.String()
            },
        })
    };
    const successResponse = openApi.declareSchema("Color found", ts_openapi_1.Types.Object({
        properties: {
            data: colorBaseSchema_1.colorSchema
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    const error401 = openApi.declareSchema("Unauthorised", colorBaseSchema_1.errorSchema);
    app.post("/search-color", (0, validationMiddleware_1.validationMiddleware)(requestSchema), (0, authMiddleware_1.authMiddleware)(), (_request, response) => {
        colorsController.searchColorByParams(_request, response);
    });
    openApi.addPath("/search-color", {
        // API method
        post: {
            description: "Search color by hex code or name",
            summary: "Search color by hex code or name",
            operationId: "search-color-api",
            requestSchema,
            responses: {
                // here we declare the response types
                200: successResponse,
                404: error400,
                401: error401
            },
            tags: ["Colors"],
            security: [{ bearerSecurity: [] }],
        },
    }, true);
}
exports.searchColor = searchColor;
function getColors_(_request, response) {
    colorsController.getAllColors(_request, response);
}
function getColorById_(_request, response) {
    colorsController.getColorById(_request, response);
}
function getColorsByGroupId_(_request, response) {
    colorsController.getColorsByGroupId(_request, response);
}
