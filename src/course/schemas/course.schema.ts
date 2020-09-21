import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    courseFolder: String,
    courseLectures: [
        {
            accessDate: String,
            additionalMaterials: [
                {
                    materialTitle: String,
                    materialLink: String,
                }
            ],
            lectureTime: Number,
            lectureTitle: String,
        }
    ],
    courseName: String,
    courseTime: Number,
    numOfLectures: Number,
});