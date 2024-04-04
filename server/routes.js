import userContent from "./api/v1/controllers/user/routes";
import adminContent from "./api/v1/controllers/admin/routes"



export default function Routes(app) {
    app.use("/api/v1/user", userContent);
    app.use("/api/v1/admin", adminContent);
    return app;
}