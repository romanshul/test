"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUser = void 0;
const ts_openapi_1 = require("ts-openapi");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const colorBaseSchema_1 = require("../common/colorBaseSchema");
const userController = require("../controllers/usersController");
function loadUser(app, openApi) {
    const requestSchema = {
        headers: {
            "authorization": ts_openapi_1.Types.String({
                description: "In order to use global swagger auth can be used global authorization",
                required: false,
            })
        }
    };
    const successResponse = openApi.declareSchema("User loaded", ts_openapi_1.Types.Object({
        properties: {
            data: ts_openapi_1.Types.Object({
                properties: {
                    id: ts_openapi_1.Types.Integer(),
                    firstName: ts_openapi_1.Types.String(),
                    lastName: ts_openapi_1.Types.String(),
                    email: ts_openapi_1.Types.String(),
                    token: ts_openapi_1.Types.String()
                }
            })
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    const error401 = openApi.declareSchema("Unauthorised", colorBaseSchema_1.errorSchema);
    app.get("/user", (0, validationMiddleware_1.validationMiddleware)(requestSchema), (0, authMiddleware_1.authMiddleware)(), (_request, response) => {
        userController.loadUser(_request, response);
    });
    openApi.addPath("/user", {
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
            tags: ["Colors"],
            security: [{ bearerSecurity: [] }],
        },
    }, true);
}
exports.loadUser = loadUser;
