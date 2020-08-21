import { IGetTestData, IUpdateTest } from './testing.types';
import { TestingService } from './testing.service';
export declare class TestingController {
    private testingService;
    constructor(testingService: TestingService);
    getCoursesTests(): Promise<any>;
    updateTest(body: IUpdateTest): Promise<any>;
    getTest(body: IGetTestData): Promise<any>;
}
