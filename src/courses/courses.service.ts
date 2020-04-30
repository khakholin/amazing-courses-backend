import { Injectable } from '@nestjs/common';

import * as moment from 'moment';
import * as courses from './data/courses.data';
import { IUserInformation, IUserData, ICourseData } from './courses.types';
import userList from './data/user-list.data';

@Injectable()
export class CoursesService {
    private users = userList;

    public getUserCourses(user: IUserInformation): IUserData {
        let userData = { user: user.user, totalNumOfLectures: 0, totalTime: 0, data: [] };
        this.users.map((item) => {
            if (item.user === user.user) {
                if (item.password === user.password) {
                    userData.data = item.courses;
                }
            }
        });
        if (userData.data) {
            userData.data.map((item) => {
                userData.totalNumOfLectures += item.numOfLectures;
                userData.totalTime += item.time;
            });
        }

        return userData;
    }
}


