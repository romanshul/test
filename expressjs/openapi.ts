import { Application } from "express";
import { bearerAuth, OpenApi } from "ts-openapi";

const swaggerUi = require('swagger-ui-express');

// create an OpenApi instance to store definitions
export const openApiInstance = new OpenApi(
    "v1.0", // API version
    "Api title", // API title
    "How to keep APIs documented.", // API description
    "rm.shulzhenko@gmail.com", // API maintainer
);

// declare servers for the API
openApiInstance.setServers([{ url: "https://colors.local" }]);

// set API license
openApiInstance.setLicense(
    "Apache License, Version 2.0", // API license name
    "http://www.apache.org/licenses/LICENSE-2.0", // API license url
    "http://dummy.io/terms/" // API terms of service
);

openApiInstance.declareSecurityScheme("bearerSecurity", bearerAuth())

export function initOpenApi(app: Application, openApi: OpenApi) {
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