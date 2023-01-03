import { Application, Request, Response } from "express";
import {OpenApi, textPlain, OpenApiSchema, Types, WebRequestSchema} from "ts-openapi";
import {queryParameterArray} from "../middleware/query-parameter-array";
import {validationMiddleware} from "../middleware/validationMiddleware";
import {colorSchema, errorSchema} from "../common/colorBaseSchema";
import {login} from "../controllers/usersController";

export function authInit(app: Application, openApi: OpenApi) {
    const requestSchema = {
        body: Types.Object({
            description: "User login",
            properties: {
                email: Types.String(),
                password: Types.String()
            },
        })
    }

    const successResponse = openApi.declareSchema(
        "Color found",
        Types.Object({
            properties: {
                data: {
                    id: Types.Integer(),
                    firstName: Types.String(),
                    lastName: Types.String(),
                    email: Types.String(),
                    token: Types.String()
                }
            }
        })
    )

    const error400 = openApi.declareSchema("Bad Request", errorSchema)

    app.post("/login",
        validationMiddleware(requestSchema),
        (_request: Request, response: Response) => {
            login(_request, response)
        }
    );

    openApi.addPath(
        "/login",
        {
            // API method
            post: {
                description: "User authentication",
                summary: "Login by email, password",
                operationId: "login-api",
                requestSchema,
                responses: {
                    // here we declare the response types
                    200: successResponse,
                    404: error400
                },
                tags: ["Auth"], // these tags group your methods in UI
            },
        },
        true
    )
}