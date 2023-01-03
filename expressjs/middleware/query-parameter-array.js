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
exports.queryParameterArray = void 0;
function queryParameterArray(name) {
    /* this middleware makes sure a query parameter is always an array
      because express only converts to array when given multiple options:
          type=a,b > array
          type=a > string
      */
    return (request, _response, next) => __awaiter(this, void 0, void 0, function* () {
        if (request.query[name] && !Array.isArray(request.query[name])) {
            request.query[name] = [request.query[name]];
        }
        next();
    });
}
exports.queryParameterArray = queryParameterArray;
