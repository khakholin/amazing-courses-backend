import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserStudents, IUserRoles, IChangeRoles } from './users.types';

export type User = any;
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {
    }

    async getAllUsernames(): Promise<any[]> {
        const users = await this.userModel.find();
        if (users) {
            return users.map(user => ({ email: user.email, realName: user.realName, realSurname: user.realSurname }));
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USERS_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async changeRoles(data: IChangeRoles): Promise<any> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            user.roles = data.roles;
            await user.save();
            return { roles: user.roles };
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }


    async getUserMentors(data): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            return user.mentors;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getAllUsers(data: { email: string }): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user.roles.find(item => item === 'admin')) {
            const users = await this.userModel.find();
            for (const user of users) {
                user.password = undefined;
            }
            return users;
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'ACCESS_IS_DENIED',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async getUserData(data): Promise<any[]> {
        return await this.userModel.findOne({ email: data.email });
    }

    async changeUserMentors(data): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            const arr = user.mentors;
            let isMentorAvailable = true;
            arr.map((item, index) => {
                if (item === data.mentor) {
                    user.mentors.splice(index, 1);
                    isMentorAvailable = false;
                }
            });
            if (isMentorAvailable) {
                user.mentors.push(data.mentor);
            }
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_MENTORS_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    };

    async getUserStudents(data: IUserStudents): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            if (data.roles.find(role => role === 'mentor')) {
                const users = await this.userModel.find();
                let students = [];
                for (const i of users) {
                    if (i.mentors.find(item => item === data.email)) {
                        students.push(i);
                    };
                }
                return students;
            } else {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    message: 'ACCESS_IS_DENIED',
                }, HttpStatus.FORBIDDEN);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    };

    async updateUserData(data): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            user.realName = data.realName;
            user.realSurname = data.realSurname;
            user.school = data.school;
            user.university = data.university;
            user.workPlace = data.workPlace;
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_DATA_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async updateUserEmail(data): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email, password: data.password });
        if (user) {
            user.email = data.newEmail;
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_EMAIL_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_PASSWORD',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async updateUserPassword(data): Promise<any[]> {
        const user = await this.userModel.findOne({ email: data.email, password: data.oldPassword });
        if (user) {
            user.password = data.newPassword;
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_PASSWORD_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_PASSWORD',
            }, HttpStatus.FORBIDDEN);
        }
    }
}


