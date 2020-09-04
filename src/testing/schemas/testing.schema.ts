import * as mongoose from 'mongoose';

export const TestingSchema = new mongoose.Schema({
    courseName: String,
    numOfLectures: Number,
    courseTests: [
        {
            lectureTitle: String,
            lectureQuestions: [
                {
                    question: String,
                    answerOptions: [String],
                    isAnswerOptions: Boolean,
                    answer: String,
                }
            ],
        },
    ],
});