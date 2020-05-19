import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    availableCourses: [
        {
            title: String,
            numAvailableLectures: Number,
            numCheckedLectures: Number,
        }
    ],
    email: String,
    password: String,
    role: String,
    username: String,
});