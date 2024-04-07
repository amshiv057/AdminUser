import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .post("/loginAdmin", controller.loginAdmin)
    .use(auth.verifyToken)
    .post("/createQuiz", controller.createQuiz)
    .get("/getQuizList", controller.quizList)
    .get("/getQuiz/:_id", controller.findQuiz)
    .delete("/deleteQuiz/:_id", controller.deleteQuiz)