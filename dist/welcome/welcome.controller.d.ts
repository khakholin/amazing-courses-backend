import { WelcomeService } from './welcome.service';
export declare class WelcomeController {
    private welcomeService;
    constructor(welcomeService: WelcomeService);
    recoveryPassword(body: any): Promise<boolean>;
}
