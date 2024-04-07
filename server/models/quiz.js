import mongoose from "mongoose";
import status from "../enums/status";
const timeStamps = {
    timestamps: true,
    collection: 'quiz'
}
const quizSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: {
        type: Array
    },
    status: {
        type: String,
        enums: [status.PENDING, status.COMPLETED],
        default: status.PENDING,
    }
}, timeStamps);

module.exports = mongoose.model('quiz', quizSchema);