import userModel from "../../../models/user";

const userServices = {
    createUser: async (insertObj) => {
        return await userModel.create(insertObj);
    },
    findUser: async (query) => {
        return await userModel.findOne(query);s
    },

}

module.exports = { userServices };