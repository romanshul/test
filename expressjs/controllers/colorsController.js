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
exports.check = exports.searchColorByParams = exports.getRandomColor = exports.getColorsByGroupId = exports.getColorById = exports.getAllColors = void 0;
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
const { Colors } = require('../models');
const sequelize = require('../models').sequelize;
// const colorsService = require("../services/colorsService")
const getAllColors = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let maxLimit = process.env.REQUEST_MAX_LIMIT_PER_PAGE;
        let colors = yield Colors.findAndCountAll({
            offset: req.query.offset || 0,
            limit: req.query.limit || 12
        });
        return res.json({ data: colors });
    });
};
exports.getAllColors = getAllColors;
const getColorById = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let color = yield Colors.findOne({ where: { id: req.params.id } });
        return res.json({ data: color });
    });
};
exports.getColorById = getColorById;
const getColorsByGroupId = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let colors = yield Colors.findAndCountAll({
                where: { group_id: req.params.id },
                offset: req.query.offset,
                limit: 12
            });
            return res.json({ data: colors });
        }
        catch (e) {
            next();
        }
    });
};
exports.getColorsByGroupId = getColorsByGroupId;
const getRandomColor = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let color = yield Colors.findAll({ order: sequelize.random(), limit: 1 });
            color = color.map((cl) => ({
                id: cl.id,
                code: cl.code,
                name: cl.name
            }))[0];
            return res.json({ data: color });
        }
        catch (e) {
            next;
        }
    });
};
exports.getRandomColor = getRandomColor;
const searchColorByParams = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let keyWord = (0, lodash_1.upperFirst)(req.body.keyWord);
        try {
            let color = yield Colors.findOne({ where: {
                    [sequelize_1.Op.or]: [
                        { code: keyWord },
                        { name: keyWord }
                    ]
                }
            });
            return res.json({ data: color });
        }
        catch (e) {
            console.log(e);
            next;
        }
    });
};
exports.searchColorByParams = searchColorByParams;
const check = function (req, res, next) {
    res.render('index', { title: 'Check index page' });
};
exports.check = check;
