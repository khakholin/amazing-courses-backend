export declare type Course = any;
export declare class CoursesService {
    private readonly courses;
    constructor();
    getUserCourses(availableCourses: any): {
        totalNumOfLectures: number;
        totalTime: number;
        data: any[];
    };
}
