
import quizModel from "../../../models/quiz";

const quizServices = {
    createQuiz: async (insertObj) => {
        return await quizModel.create(insertObj);
    },
    findQuiz: async (query) => {
        return await quizModel.findOne(query);
    },
    findQuizList: async () => {
        return await quizModel.find().sort({ createdAt: -1 });
    },
    deleteQuiz: async (query) => {
        return await quizModel.deleteOne(query);
    }
}

module.exports = { quizServices };