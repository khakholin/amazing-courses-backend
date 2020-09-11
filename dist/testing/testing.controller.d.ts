import { IGetTestData, IUpdateTest, ICheckTest } from './testing.types';
import { TestingService } from './testing.service';
export declare class TestingController {
    private testingService;
    constructor(testingService: TestingService);
    getAllTests(req: any): Promise<any>;
    updateTest(body: IUpdateTest): Promise<any>;
    getTestWatch(body: IGetTestData): Promise<any>;
    getAvailableLecturesTests(body: {
        courseName: string;
    }): Promise<any>;
    getTestEdit(body: IGetTestData): Promise<any>;
    checkTest(body: ICheckTest): Promise<any>;
}
