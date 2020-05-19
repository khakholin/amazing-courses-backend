import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    lectures: [
        {
            available: Boolean,
            checked: Boolean,
            title: String,
            time: Number,
        }
    ],
    numOfLectures: Number,
    time: Number,
    title: String,
});