import { ICourseData } from "../courses.types";

export const reactCourse: ICourseData = {
    title: 'React',
    numOfLectures: 5,
    time: 2351,
    lectures: [
        { available: true, checked: true, title: 'Hooks', time: 182 },
        { available: true, checked: true, title: 'Router', time: 318 },
        { available: true, checked: false, title: 'Redux', time: 774 },
        { available: false, checked: false, title: 'Saga', time: 614 },
        { available: false, checked: false, title: 'Result', time: 463 },
    ],
}

export const cookingCourse: ICourseData = {
    title: 'Кулинария',
    numOfLectures: 3,
    time: 2251,
    lectures: [
        { available: true, checked: true, title: 'Яйца', time: 751 },
        { available: true, checked: false, title: 'Пончики', time: 949 },
        { available: false, checked: false, title: 'Блины', time: 551 },
    ],
}
