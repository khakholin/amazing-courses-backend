import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    availableCourses: Array,
    email: String,
    username: String,
    password: String,
});