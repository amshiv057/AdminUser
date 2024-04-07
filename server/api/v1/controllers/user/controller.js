import Joi from "joi";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import apiError from "../../../../helper/apiError";
import { userServices } from "../../services/user";
const { createUser, findUser } = userServices;
import { createHash, compareHash, getToken } from "../../../../helper/utils";


class userController {
    async createUser(req, res, next) {
        const validSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ email: value.email });
            if (userResult) {
                throw apiError.alreadyExist(responseMessage.USER_EXIST)
            }
            const hashpassword = await createHash(value.password);
            value.password = hashpassword;
            const result = await createUser(value);
            return res.json(new response(result, responseMessage.USER_CREATED))
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const validSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value)
            const userResult = await findUser({ email: value.email });
            console.log(userResult);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            const comparesPassword = await compareHash(userResult.password, value.password);
            if (!comparesPassword) {
                throw apiError.invalid(responseMessage.INCORRECT_PASSWORD);
            }
            const token = await getToken({ _id: userResult._id, email: userResult.email })
            return res.json(new response({ userResult, token }, responseMessage.USER_LOGGED));
        } catch (error) {
            next(error);
        }
    }
}


export default new userController();