import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import apiErrorHandler from "../helper/apiErrorHandler";
const app = new express();

class ExpressServer {
    constructor() {
        app.use(express.json({ limit: '1000mb' }));
        app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
        app.use(morgan("dev"));
        app.use(cors());
    }

    router(routes) {
        routes(app)
        return this;
    }
    handleError() {
        app.use(apiErrorHandler);
        return this
    }
    async configureDB(dbUrl) {
        return mongoose.connect(dbUrl, {
        }).then(() => {
            console.log("MongoDB connection stablished")
            return this
        }).catch((error) => {
            console.log("Error occured in mongodb connection", error);
            throw error;
        })
    };

    listen(port) {
        app.listen(port, () => {
            console.log(`Secure app is running on port 🌍 ${port}`, new Date().toLocaleString());
        });
        return app;
    }
}


export default ExpressServer;