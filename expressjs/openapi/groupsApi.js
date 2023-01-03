"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = void 0;
const ts_openapi_1 = require("ts-openapi");
const colorBaseSchema_1 = require("../common/colorBaseSchema");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const groupsController = require('../controllers/groupsController');
function getGroups_(_request, response) {
    groupsController.getAllGroups(_request, response);
}
function getGroups(app, openApi) {
    const requestSchema = {
        query: {}
    };
    const successResponse = openApi.declareSchema("Successful Colors List Response", ts_openapi_1.Types.Object({
        description: "Successful Operation",
        properties: {
            data: ts_openapi_1.Types.Array({
                arrayType: {
                    id: ts_openapi_1.Types.Integer(),
                    name: ts_openapi_1.Types.String()
                }
            })
        }
    }));
    const error400 = openApi.declareSchema("Bad Request", colorBaseSchema_1.errorSchema);
    app.get("/get-groups", (0, validationMiddleware_1.validationMiddleware)(requestSchema), getGroups_);
    // declare our API
    openApi.addPath("/get-groups", // this is API path
    {
        // API method
        get: {
            description: "Get colors' groups",
            summary: "Getting colors' groups from database",
            operationId: "get-groups-api",
            responses: {
                // here we declare the response types
                200: successResponse,
                400: error400
            },
            tags: ["Groups"], // these tags group your methods in UI
        },
    }, true // make method visible
    );
}
exports.getGroups = getGroups;
