import jwt from "jsonwebtoken";
import adminModel from "../models/admin";
import apiError from "./apiError";
import responseMessage from "../../assets/responseMessage";
require("../../config/config");

module.exports = {
    async verifyToken(req, res, next) {
        if (req.headers.token) {
            console.log(req.headers.token);
            jwt.verify(req.headers.token, global.gConfig.jwtsecret, async (err, result) => {
                if (err) {
                    throw apiError.unauthorized();
                }
                else {
                    console.log(">>>>>>>",result._id);
                    const userReslt = await adminModel.findOne({ _id: result.id });
                    console.log(userReslt);

                    if (!userReslt) {
                        console.log("error");
                        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
                    }
                    else {
                        req.userId = result.id;
                        req.userDetails = result;
                        next();
                    }
                }
            })
        }
        else {
            throw apiError.badRequest(responseMessage.NO_TOKEN)
        }
    }

}