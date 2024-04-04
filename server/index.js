import Server from "./common/server";
import Routes from "./routes"

require("../config/config");
console.log(global.gConfig);

let dbUrl;
dbUrl = global.gConfig.config_id === "production" ? `mongodb+srv://${global.gConfig.dbCredential.user}:${global.gConfig.dbCredential.password}${global.gConfig.dbCredential.host}/${global.gConfig.dbCredential.dbName}` :
    global.gConfig.config_id === "development" ? `mongodb://${global.gConfig.databaseHost}:${global.gConfig.databasePort}/${global.gConfig.databaseName}` :
        'mongodb+srv://tiwarishiv7169:Shivam12@cluster0.bzkdvic.mongodb.net/Note_app'

const server = new Server()
    .router(Routes)
    .handleError()
    .configureDB(dbUrl)
    .then((_server) => _server.listen(global.gConfig.port));


export default server;