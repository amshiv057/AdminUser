import mongoose from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'user'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},timeStamps)

module.exports = mongoose.model('user', userSchema);

(async () => {
    const checkAdmin = await mongoose.model('user', userSchema).findOne({ email: 'admin12@gmail.com' });

    if (!checkAdmin) {
        const result = await mongoose.model('user', userSchema).create({
            name: "Admin",
            email: "admin12@gmail.com",
            password: "$2y$10$VpBtPHJ8iCsgSnItncIxRe6IMFJde.FyEWC/3VYTaV2qfr9XWFNu6"
        });
        console.log("admin created", result)
    }
    else {
        console.log("Default admin already Created");
    }
})
    .call();