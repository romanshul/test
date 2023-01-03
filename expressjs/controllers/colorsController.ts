import {NextFunction, Request, Response} from "express";
import {Op} from "sequelize"
import {upperFirst} from "lodash";

const { Colors } = require('../models');
const sequelize = require('../models').sequelize;

// const colorsService = require("../services/colorsService")


export const getAllColors = async function(req: Request, res: Response, next: NextFunction) {
    let maxLimit = process.env.REQUEST_MAX_LIMIT_PER_PAGE

    let colors = await Colors.findAndCountAll({
        offset: req.query.offset || 0,
        limit: req.query.limit || 12
    })

    return res.json({data: colors})
}

export const getColorById = async function(req: Request, res: Response, next: NextFunction) {

    let color = await Colors.findOne({where: {id: req.params.id}})

    return res.json({data: color})
}

export const getColorsByGroupId = async function(req: Request, res: Response, next: NextFunction) {

    try {
        let colors = await Colors.findAndCountAll({
            where: {group_id: req.params.id},
            offset: req.query.offset,
            limit: 12
        })
        return res.json({data: colors})
    } catch (e) {
        next()
    }
}

export const getRandomColor = async function(req: Request, res: Response, next: NextFunction) {
    try {
        let color = await Colors.findAll({order: sequelize.random(), limit: 1})
        color = color.map((cl: any) => ({
            id: cl.id,
            code: cl.code,
            name: cl.name
        }))[0]
        return res.json({data: color})
    } catch (e) {
        next
    }
}

export const searchColorByParams = async function(req: Request, res: Response, next: NextFunction)
{
    let keyWord = upperFirst(req.body.keyWord)
    try {
        let color = await Colors.findOne({where: {
                [Op.or]: [
                    {code: keyWord},
                    {name: keyWord}
                ]
            }
        })
        return res.json({data: color})
    } catch (e) {
        console.log(e)
        next
    }
}

export const check = function(req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Check index page' });
}