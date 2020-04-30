"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_list_data_1 = require("./data/user-list.data");
let CoursesService = class CoursesService {
    constructor() {
        this.users = user_list_data_1.default;
    }
    getUserCourses(user) {
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
};
CoursesService = __decorate([
    common_1.Injectable()
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map