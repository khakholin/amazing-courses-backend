export interface IUserInformation {
    user: string;
    password: string;
}
export interface IUserData {
    totalNumOfLectures: number;
    totalTime: number;
    data: ICourseData[];
}
export interface ICourseData {
    title: string;
    numOfLectures: number;
    time: number;
    lectures: ILectureData[];
}
export interface ILectureData {
    title: string;
    time: number;
}
