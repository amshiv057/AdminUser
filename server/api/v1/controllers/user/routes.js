import Express from "express";
import controller from "./controller";
export default Express.Router()
          .post("/createUser",controller.createUser)
          .post("/loginUser",controller.loginUser)