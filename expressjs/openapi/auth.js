"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInit = void 0;
const ts_openapi_1 = require("ts-openapi");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const colorBaseSchema_1 = require("../common/colorBaseSchema");
const usersController_1 = require("../controllers/usersController");
function authInit(app, openApi) {
    const requestSchema = {
        body: ts_openapi_1.Types.Object({
            description: "User login",
            properties: {
                email: ts_openapi_1.Types.String(),
                password: ts_openapi_1.Types.String()
            },
        })
    };
    const successResponse = openApi.declareSchema("Color found", ts_openapi_1.Types.Object({
        properties: {
            data: {
                id: ts_openapi_1.Types.Integer(),
                firstName: ts_openapi_1.Types.String(),
                lastName: ts_openapi_1.Types.String(),
                email: ts_openapi_1.Types.String(),
                token: ts_openapi_1.Types.String()
            }
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.post("/login", (0, validationMiddleware_1.validationMiddleware)(requestSchema), (_request, response) => {
        (0, usersController_1.login)(_request, response);
    });
    openApi.addPath("/login", {
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
    }, true);
}
exports.authInit = authInit;
