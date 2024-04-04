import Joi from "joi";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import apiError from "../../../../helper/apiError";
import { adminServices } from "../../services/admin";
const { createAdmin, findAdmin } = adminServices;
import { userServices } from "../../services/user";
const { createUser, findUser, findUserList } = userServices;
import { createHash, compareHash, getToken } from "../../../../helper/utils";

class adminController {
    async createAdmin(req, res, next) {
        const validSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()

        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value);
            const adminResult = await findAdmin({ email: value.email });
            console.log(adminResult);
            if (adminResult.length > 0) {
                throw apiError.alreadyExist(responseMessage.EMAIL_EXIST)
            }
            const hashPassword = await createHash(value.password);
            value.password = hashPassword;
            const result = await createAdmin(value);
            return res.json(new response(result, responseMessage.ADMIN_CREATED));
        } catch (error) {
            next(error);
        }
    };
    async loginAdmin(req, res, next) {
        const validSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            const adminResult = await findAdmin({ email: value.email });
            console.log(adminResult);
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            const token = await getToken({ id: adminResult[0]. _id, email: value.email });
            return res.json(new response({ adminResult, token }, responseMessage.USER_LOGGED))
        } catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
        const validSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            const adminResult = await findAdmin({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const userResult = await findUser({ email: value.email });
            if (userResult.length>0) {
                throw apiError.alreadyExist(responseMessage.USER_EXIST);
            }
            const hashPassword = await createHash(value.password);
            const obj = {
                adminId: req.userId,
                name: value.name,
                email: value.email,
                password: hashPassword
            }
            const result = await createUser(obj);
            return res.json(new response(result, responseMessage.USER_CREATED));
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async getUserList(req, res, next) {
        try {
            const adminResult = await findAdmin({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const result = await findUserList();
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            next(error);
        }
    }

}


export default new adminController();