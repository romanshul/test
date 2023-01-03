import {NextFunction, Request, Response} from "express"
import {Op} from "sequelize"
import bcrypt from "bcryptjs"

const { User } = require('../models')
const sequelize = require('../models').sequelize
const jwt = require("jsonwebtoken");

export const login = async function (req: Request, res: Response) {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: {email: email}  });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token
            return res.json(user)
        }

    } catch (e) {
        console.log(e)
    }

    return res.json({token: ''})
}

export const loadUser = async function(req: Request, res: Response) {
    try {
        let token = req.headers['authorization']
            token = token.replace(/^Bearer\s+/, "")

        let user = jwt.verify(token, process.env.JWT_SECRET)
            user = await User.findOne({where: {id: user.user_id}})
        return res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token
        })
    } catch (e) {
        console.log(e)
    }

}