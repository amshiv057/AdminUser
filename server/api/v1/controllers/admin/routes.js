import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .post("/createAdmin", controller.createAdmin)
    .post("/loginAdmin", controller.loginAdmin)
    .use(auth.verifyToken)
    .post("/createUser", controller.createUser)
    .get("/userList",controller.getUserList)