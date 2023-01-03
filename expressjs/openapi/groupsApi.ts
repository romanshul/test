import { Application, Request, Response } from "express";
import {OpenApi, textPlain, Types} from "ts-openapi";
import {errorSchema} from "../common/colorBaseSchema";
import {validationMiddleware} from "../middleware/validationMiddleware";

const groupsController = require('../controllers/groupsController')

function getGroups_(_request: Request, response: Response) {
    groupsController.getAllGroups(_request, response);
}

export function getGroups(app: Application, openApi: OpenApi) {
    const requestSchema = {
        query: {}
    }

    const successResponse = openApi.declareSchema(
        "Successful Colors List Response",
        Types.Object({
            description: "Successful Operation",
            properties: {
                data: Types.Array({
                    arrayType: {
                        id: Types.Integer(),
                        name: Types.String()
                    }
                })

            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)

    app.get(
        "/get-groups",
        validationMiddleware(requestSchema),
        getGroups_
    );

    // declare our API
    openApi.addPath(
        "/get-groups", // this is API path
        {
            // API method
            get: {
                description: "Get colors' groups", // Method description
                summary: "Getting colors' groups from database", // Method summary
                operationId: "get-groups-api", // an unique operation id
                responses: {
                    // here we declare the response types
                    200: successResponse,
                    400: error400
                },
                tags: ["Groups"], // these tags group your methods in UI
            },
        },
        true // make method visible
    );
}
