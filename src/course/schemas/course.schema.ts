import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    courseFolder: String,
    courseLectures: [
        {
            lectureTime: Number,
            lectureTitle: String,
        }
    ],
    courseName: String,
    courseTime: Number,
    numOfLectures: Number,
});