export interface ILectureData {
    lectureTime: number;
    lectureTitle: string;
}
export interface ICourseData {
    courseFolder: string;
    courseLectures: ILectureData[];
    courseName: string;
    courseTime: string;
    numOfLectures: string;
}
