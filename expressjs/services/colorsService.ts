'use strict';

import {NextFunction, Request, Response} from "express";

const { Colors } = require('../models')

// exports.getAllColors = async () => {
//     return await Colors.findAll()
// }

export const getAllColors = async function() {
    let colors = await ColorsService.getAllColors
    // console.log(colors)
    return 'found';
}
