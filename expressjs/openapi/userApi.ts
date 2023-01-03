import { Application, Request, Response } from "express";
import {OpenApi, textPlain, OpenApiSchema, Types, WebRequestSchema, bearerAuth} from "ts-openapi";
import {queryParameterArray} from "../middleware/query-parameter-array";
import {validationMiddleware} from "../middleware/validationMiddleware";
import {authMiddleware} from "../middleware/authMiddleware"
import {colorSchema, errorSchema} from "../common/colorBaseSchema";

const userController = require("../controllers/usersController")

export function loadUser(app: Application, openApi: OpenApi) {
    const requestSchema = {
        headers: {
            "authorization": Types.String({
                description: "In order to use global swagger auth can be used global authorization",
                required: false,
            })
        }
    }

    const successResponse = openApi.declareSchema(
        "User loaded",
        Types.Object({
            properties: {
                data: Types.Object({
                    properties: {
                        id: Types.Integer(),
                        firstName: Types.String(),
                        lastName: Types.String(),
                        email: Types.String(),
                        token: Types.String()
                    }
                })
            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)
    const error401 = openApi.declareSchema("Unauthorised", errorSchema)

    app.get("/user",
        validationMiddleware(requestSchema),
        authMiddleware(),
        (_request: Request, response: Response) => {
            userController.loadUser(_request, response)
        });

    openApi.addPath(
        "/user",
        {
            // API method
            get: {
                description: "Load authorized user",
                summary: "Load user by bearer token",
                operationId: "load-user-api",
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