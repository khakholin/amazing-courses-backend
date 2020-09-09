export interface IAvailableCourses {
    title: string;
    numAvailableLectures: number;
    numCheckedLectures: number;
}
export interface ICoursesNames {
    availableCourses: string[];
}
export interface IUserRegData {
    email: string;
    realName: string;
    realSurname: string;
    password: string;
}
export interface IUserRecoveryData {
    email: string;
}
export interface IUserTestingProgress {
    email: string;
    courseName: string;
    lectureTitle: string;
}
export interface IUserStudents {
    roles: string[];
    email: string;
}
export interface IUserRoles {
    roles: string[];
}
