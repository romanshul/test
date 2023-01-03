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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUser = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { User } = require('../models');
const sequelize = require('../models').sequelize;
const jwt = require("jsonwebtoken");
const login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield User.findOne({ where: { email: email } });
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                const token = jwt.sign({ user_id: user.id, email }, process.env.JWT_SECRET, {
                    expiresIn: "2h",
                });
                user.token = token;
                return res.json(user);
            }
        }
        catch (e) {
            console.log(e);
        }
        return res.json({ token: '' });
    });
};
exports.login = login;
const loadUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['authorization'];
            token = token.replace(/^Bearer\s+/, "");
            let user = jwt.verify(token, process.env.JWT_SECRET);
            user = yield User.findOne({ where: { id: user.user_id } });
            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: token
            });
        }
        catch (e) {
            console.log(e);
        }
    });
};
exports.loadUser = loadUser;
