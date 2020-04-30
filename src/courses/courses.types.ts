export interface IUserInformation {
    user: string;
    password: string;
}

export interface IUserData {
    user: string;
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
    available: boolean;
    checked: boolean;
    title: string;
    time: number;
}