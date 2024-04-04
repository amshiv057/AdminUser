import adminModel from "../../../models/admin";

const adminServices = {
    createAdmin: async (insertObj) => {
        return await adminModel.create(insertObj);
    },
    findAdmin: async (query) => {
        return await adminModel.find(query).populate({ path: 'userId', select: 'name email' });
    }
}

module.exports = { adminServices };