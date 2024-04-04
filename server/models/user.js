import mongoose from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'user'
}

const userSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: 'admin'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema);