import mongoose, { model } from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'admin'
};

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    }
}, timeStamps);

module.exports = mongoose.model("admin", adminSchema);