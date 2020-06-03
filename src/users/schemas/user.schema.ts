import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    availableCourses: [String],
    courseProgress: [
        {
            courseName: String,
            availableLectures: [Number],
            checkedLectures: [Number],
        }
    ],
    email: String,
    password: String,
    realName: String,
    realSurname: String,
    role: String,
    school: String,
    university: String,
    username: String,
    workPlace: String,
});