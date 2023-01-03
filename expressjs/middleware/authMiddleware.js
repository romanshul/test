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
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const jwt = require("jsonwebtoken");
const authMiddleware = () => {
    return (request, _response, next) => __awaiter(void 0, void 0, void 0, function* () {
        let token = request.headers['authorization'];
        if (!token) {
            const appError = (0, errors_1.wrapApplicationError)(401, `Error in headers 1 of ${request.baseUrl}${request.path} -> authentication error`);
            next(appError);
        }
        try {
            // @ts-ignore
            token = token.replace(/^Bearer\s+/, "");
            jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (e) {
            const message = `Error in headers 2 of ${request.baseUrl}${request.path} -> Auth error`;
            const appError = (0, errors_1.wrapApplicationError)(401, `Error in headers of ${request.baseUrl}${request.path} -> authentication error`);
            next(appError);
        }
        next();
    });
};
exports.authMiddleware = authMiddleware;
