import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    tc: {
        type: Boolean,
        required: true,
    },
})

const User = mongoose.model("User", userSchema);

export default User;
