export declare type User = any;
export declare class UserService {
    private readonly testUsers;
    constructor();
    findOne(username: string): Promise<User | undefined>;
    findEmailDuplicate(email: string): Promise<User | undefined>;
}
