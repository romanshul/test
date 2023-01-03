import { Application, Request, Response } from "express";
import {OpenApi, textPlain, OpenApiSchema, Types, WebRequestSchema, bearerAuth} from "ts-openapi";
import {queryParameterArray} from "../middleware/query-parameter-array";
import {validationMiddleware} from "../middleware/validationMiddleware";
import {authMiddleware} from "../middleware/authMiddleware"
import {colorSchema, errorSchema} from "../common/colorBaseSchema";

const colorsController = require('../controllers/colorsController')

export function getColors(app: Application, openApi: OpenApi) {
    const requestSchema = {
            query: {
                offset: Types.Integer({
                    description: "Page number",
                    default: 0,
                    minValue: 0,
                }),
            limit: Types.Integer({
                description: "Records per page",
                default: 12,
                minValue: 10,
                maxValue: 100
            })
        },
    }

    const successResponse = openApi.declareSchema(
        "Successful Colors List Response",
        Types.Object({
            description: "Successful Operation",
            properties: {
                data: Types.Object({
                    properties: {
                        count: Types.Integer(),
                        rows: Types.Array({
                            description: "An array of colors",
                            arrayType: colorSchema
                        })
                    }
                })

            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)

    app.get("/get-colors",
        validationMiddleware(requestSchema),
        getColors_
    );

    // declare our API
    // openApi.declareSecurityScheme("bearerSecurity", bearerAuth());
    openApi.addPath(
        "/get-colors",
        {
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
        },
        true // make method visible
    );

}

export function getColorById(app: Application, openApi: OpenApi) {
    const requestSchema = {
        params: {
            id: Types.Integer({
                description: "Color ID",
                minValue: 1,
                required: true
            })
        },
    }

    const successResponse = openApi.declareSchema(
        "Successful Colors List Response",
        Types.Object({
            description: "Color data",
            properties: {data: colorSchema}
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema);

    app.get("/get-color/:id",
        validationMiddleware(requestSchema),
        getColorById_
    );

    // declare our API
    openApi.addPath(
        "/get-color/:id",
        {
            get: {
                description: "Get colors", // Method description
                summary: "Getting color object by id", // Method summary
                operationId: "getColorsApi", // an unique operation id,
                requestSchema,
                responses: {
                    // here we declare the response types
                    200: successResponse,
                    400: error400
                },
                tags: ["Colors"], // these tags group your methods in UI
            },
        },
        true // make method visible
    );
}

export function getColorsByGroupId(app: Application, openApi: OpenApi) {
    const requestSchema = {
        query: {
            offset: Types.Integer({
                description: "Page number",
                default: 0,
                minValue: 0,
            }),
            limit: Types.Integer({
                description: "Records per page",
                default: 12,
                minValue: 10,
                maxValue: 100
            })
        },
        params: {
            id: Types.Integer({
                description: "Color ID",
                minValue: 1,
                required: true
            })
        }
    }

    const successResponse = openApi.declareSchema(
        "Successful Colors List Response",
        Types.Object({
            description: "Successful Operation",
            properties: {
                data: Types.Object({
                    properties: {
                        count: Types.Integer(),
                        rows: Types.Array({
                            arrayType: colorSchema
                        })
                    }
                })

            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)

    app.get("/get-colors-group/:id",
        validationMiddleware(requestSchema),
        getColorsByGroupId_
    );

    // declare our API
    openApi.addPath(
        "/get-colors-group/:id",
        {
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
        },
        true
    )
}


export function getRandomColor(app: Application, openApi: OpenApi)
{
    const requestSchema = {
        query: {}
    }

    const successResponse = openApi.declareSchema(
        "Successful random color Response",
        Types.Object({
            description: "Successful Operation",
            properties: {
                data: colorSchema
            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema);

    app.get("/get-random-color",
        validationMiddleware(requestSchema),
        (_request: Request, response: Response) => {
            colorsController.getRandomColor(_request, response)
        });

    // declare our API
    openApi.addPath(
        "/get-random-color",
        {
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
        },
        true
    )
}

export function searchColor(app: Application, openApi: OpenApi) {
    const requestSchema = {
        headers: {
            "authorization": Types.String({
                description: "In order to use global swagger auth, the field is unnecessary",
                required: false,
            })
        },
        body: Types.Object({
            description: "Search color by name or hex code",
            properties: {
                keyWord: Types.String()
            },
        })
    }

    const successResponse = openApi.declareSchema(
        "Color found",
        Types.Object({
            properties: {
                data: colorSchema
            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)
    const error401 = openApi.declareSchema("Unauthorised", errorSchema)

    app.post("/search-color",
        validationMiddleware(requestSchema),
        authMiddleware(),
        (_request: Request, response: Response) => {
        colorsController.searchColorByParams(_request, response)
    });

    openApi.addPath(
        "/search-color",
        {
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
                tags: ["Colors"], // these tags group your methods in UI
                security: [{ bearerSecurity: [] }],
            },
        },
        true
    )
}

function getColors_(_request: Request, response: Response) {
    colorsController.getAllColors(_request, response);
}

function getColorById_(_request: Request, response: Response) {
    colorsController.getColorById(_request, response)
}

function getColorsByGroupId_(_request: Request, response: Response) {
    colorsController.getColorsByGroupId(_request, response)
}