import Joi from "joi";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import apiError from "../../../../helper/apiError";
import { userServices } from "../../services/user";
import { quizServices } from "../../services/quiz";
const { findUser } = userServices;
const { createQuiz, findQuiz, findQuizList, deleteQuiz } = quizServices;
import { compareHash, getToken } from "../../../../helper/utils";

class adminController {

    async loginAdmin(req, res, next) {
        const validSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value)
            const adminResult = await findUser({ email: value.email });
            console.log(adminResult);
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            const passwordCheck = await compareHash(adminResult.password, value.password);
            if (!passwordCheck) {
                throw apiError.invalid(responseMessage.INCORRECT_PASSWORD);
            }
            const token = await getToken({ _id: adminResult._id, email: value.email });
            return res.json(new response({ adminResult, token }, responseMessage.USER_LOGGED))
        } catch (error) {
            next(error);
        }
    }
    async createQuiz(req, res, next) {
        const validSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            questions: Joi.array().required()

        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value);
            const adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const result = await createQuiz(value);
            return res.json(new response(result, responseMessage.ADMIN_CREATED));
        } catch (error) {
            next(error);
        }
    };
    async quizList(req, res, next) {
        try {
            const adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const result = await findQuizList();
            if (result.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.USER_CREATED));
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async findQuiz(req, res, next) {
        const validSchema = Joi.object({
            _id: Joi.string().required()
        })
        try {
            const { value } = validSchema.validate(req.params);
            const adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const quizResult = await findQuiz({ _id: value._id });
            if (!quizResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(quizResult, responseMessage.DATA_FOUND));
        } catch (error) {
            next(error)
        }
    }
    async deleteQuiz(req, res, next) {
        const validSchema = Joi.object({
            _id: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.params);
            console.log(">>>>>>", value);
            const adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const quizResult = await findQuiz({ _id: value._id });
            if (!quizResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            const result = await deleteQuiz({ _id: value.id });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            next(error);
        }
    }
}


export default new adminController();