import { Model } from 'mongoose';
import { IGetTestData, IUpdateTest, ICheckTest } from './testing.types';
export declare type Course = any;
export declare type User = any;
export declare type Testing = any;
export declare class TestingService {
    private courseModel;
    private userModel;
    private testingModel;
    constructor(courseModel: Model<Course>, userModel: Model<User>, testingModel: Model<Testing>);
    getAllTests(): Promise<any>;
    updateTest(updatedTest: IUpdateTest): Promise<any>;
    getTestWatch(test: IGetTestData): Promise<any>;
    getAvailableLecturesTests(test: {
        courseName: string;
    }): Promise<any>;
    getTestEdit(updatedTest: IGetTestData): Promise<any>;
    checkTest(checkedTest: ICheckTest): Promise<any>;
}
