import { Model } from 'mongoose';
export declare type User = any;
export declare class UserService {
    private userModel;
    private readonly testUsers;
    constructor(userModel: Model<User>);
    findOne(username: string): Promise<User | undefined>;
    findEmailDuplicate(email: string): Promise<User | undefined>;
    findUser(userDto: any): Promise<User>;
    create(createUserDto: any): Promise<User>;
    remove(removeUserDto: any): Promise<User>;
    removeAll(): Promise<User>;
    findAll(): Promise<User[]>;
}
