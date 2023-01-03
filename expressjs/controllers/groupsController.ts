import {NextFunction, Request, Response} from "express";
import {logger} from "sequelize/types/utils/logger";
import {upperFirst} from "lodash"

const {Groups} = require("../models")

export const getAllGroups = async function(req: Request, res: Response, next: NextFunction) {
    let groups = await Groups.findAll()
    if (groups) {
        groups = groups.map((group: any) => ({
            id: group.id,
            name: upperFirst(group.name)
        }))
    }
    return res.jsonp({data: groups});
}