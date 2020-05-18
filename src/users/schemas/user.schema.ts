import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    availableCourses: {
        title: String,
        numAvailableLectures: Number,
        numCheckedLectures: Number,
    },
    userId: Number,
    email: String,
    username: String,
    password: String,
});