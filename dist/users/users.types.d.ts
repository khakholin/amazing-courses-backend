export interface IAvailableCourses {
    title: string;
    numAvailableLectures: number;
    numCheckedLectures: number;
}
export interface IUserData {
    username: string;
    password: string;
}
export interface ICoursesNames {
    availableCourses: string[];
}
export interface IUserRegData {
    email: string;
    username: string;
    password: string;
}
export interface IUserRecoveryData {
    email: string;
}
export interface IUserTestingProgress {
    username: string;
    courseName: string;
    lectureTitle: string;
}
export interface IUserStudents {
    roles: string[];
    username: string;
}
