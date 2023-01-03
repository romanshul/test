"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOpenApi = exports.openApiInstance = void 0;
const ts_openapi_1 = require("ts-openapi");
const swaggerUi = require('swagger-ui-express');
// create an OpenApi instance to store definitions
exports.openApiInstance = new ts_openapi_1.OpenApi("v1.0", // API version
"Api title", // API title
"How to keep APIs documented.", // API description
"rm.shulzhenko@gmail.com");
// declare servers for the API
exports.openApiInstance.setServers([{ url: "https://colors.local" }]);
// set API license
exports.openApiInstance.setLicense("Apache License, Version 2.0", // API license name
"http://www.apache.org/licenses/LICENSE-2.0", // API license url
"http://dummy.io/terms/" // API terms of service
);
exports.openApiInstance.declareSecurityScheme("bearerSecurity", (0, ts_openapi_1.bearerAuth)());
function initOpenApi(app, openApi) {
    // generate our OpenApi schema
    const openApiJson = openApi.generateJson();
    // we'll create an endpoint to reply with openapi schema
    app.get("/openapi.json", function (_req, res) {
        res.json(openApiJson);
    });
    // this will make openapi UI available with our definition
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiJson));
}
exports.initOpenApi = initOpenApi;
