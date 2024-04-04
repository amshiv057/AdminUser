import userModel from "../../../models/user";

const userServices = {
    createUser: async (insertObj) => {
        return await userModel.create(insertObj);
    },
    findUser: async (query) => {
        return await userModel.find(query).populate({ path: 'adminId' });
    },
    findUserList: async () => {
        return await userModel.find();
    }
}

module.exports = { userServices };