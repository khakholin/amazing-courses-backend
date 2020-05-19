import { Model } from 'mongoose';
export declare type User = any;
export declare class SendMail {
    private userModel;
    constructor(userModel: Model<User>);
    recovery(email: string): Promise<boolean>;
}
