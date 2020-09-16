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
export interface IAddLectures {
    courseLectures: ILectureData[];
    courseName: string;
}
export interface IMoveLectures {
    courseName: string;
    newIndex: number;
    oldIndex: number;
}
