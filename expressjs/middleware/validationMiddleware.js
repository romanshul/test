"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.validationMiddleware = exports.JOI_DEFAULTS = void 0;
const ts_openapi_1 = require("ts-openapi");
const errors_1 = require("../errors");
const commonValidationOptions = {
    abortEarly: false,
    presence: "optional",
    allowUnknown: false
};
exports.JOI_DEFAULTS = {
    body: Object.assign({}, commonValidationOptions),
    query: Object.assign({}, commonValidationOptions),
    params: Object.assign(Object.assign({}, commonValidationOptions), { presence: "required" }),
    headers: Object.assign(Object.assign({}, commonValidationOptions), { allowUnknown: true }),
};
function validationMiddleware(args) {
    return (request, _response, next) => __awaiter(this, void 0, void 0, function* () {
        // validations to apply to different parts of the request
        const { body, query, headers, params } = args;
        console.log(params);
        try {
            validateSchema(request, request.body, "JSON body", body, exports.JOI_DEFAULTS.body);
            validateSchema(request, request.query, "query params", query ? ts_openapi_1.Types.Object({ properties: query }) : undefined, exports.JOI_DEFAULTS.query);
            validateSchema(request, request.params, "url params", params ? ts_openapi_1.Types.Object({ properties: params }) : undefined, exports.JOI_DEFAULTS.params);
            validateSchema(request, request.headers, "HTTP headers", headers ? ts_openapi_1.Types.Object({ properties: headers }) : undefined, exports.JOI_DEFAULTS.headers);
            next();
        }
        catch (e) {
            next(e);
        }
    });
}
exports.validationMiddleware = validationMiddleware;
function validateSchema(request, content, message, schema, options) {
    try {
        if (schema) {
            validate(content, schema, options);
        }
    }
    catch (error) {
        const appError = (0, errors_1.wrapApplicationError)(400, `Error in ${message} of ${request.baseUrl}${request.path} -> ${error.message}`, error);
        throw appError;
    }
}
exports.validateSchema = validateSchema;
function validate(valueToValidate, schema, options) {
    const { error } = schema.validate(valueToValidate, Object.assign({}, options));
    if (error) {
        throw new errors_1.ApplicationError(400, error.message, error);
    }
}
