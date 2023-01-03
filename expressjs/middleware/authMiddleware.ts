import { NextFunction, Request, Response } from "express";
import {ApplicationError, wrapApplicationError} from "../errors";

const jwt = require("jsonwebtoken");

export const authMiddleware = () => {
    return async (request: Request, _response: Response, next: NextFunction) => {

        let token = request.headers['authorization']
        if (!token) {
            const appError = wrapApplicationError(
                401,
                `Error in headers 1 of ${request.baseUrl}${request.path} -> authentication error`
            );

            next(appError);
        }
        try {
            // @ts-ignore
            token = token.replace(/^Bearer\s+/, "");
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (e: any) {
            const message = `Error in headers 2 of ${request.baseUrl}${request.path} -> Auth error`

            const appError = wrapApplicationError(
                401,
                `Error in headers of ${request.baseUrl}${request.path} -> authentication error`
            );

            next(appError)
        }
        next()
    }
};