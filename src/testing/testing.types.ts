export interface ICourseTests {
    lectureTitle: string,
    lectureQuestions:
    {
        question: string,
        answerOptions: string[],
        answer: string,
    }[],
}

export interface ITestData {
    courseName: string,
    numOfLectures: number,
    courseTests: ICourseTests[],
}

export interface IGetTestData {
    courseName: string,
    lectureTitle: string,
}

export interface IUpdateTest {
    courseName: string,
    lectureTitle: string,
    lectureQuestions:
    {
        question: string,
        answerOptions: string[],
        isAnswerOptions: boolean,
        answer: string,
    }[],
}

export interface IRemoveCourseTests {
    courseName: string,
}

export interface ICheckTest {
    email: string,
    courseName: string,
    lectureTitle: string,
    lectureAnswers: string[],
}