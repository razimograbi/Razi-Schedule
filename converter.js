const {DAYS_OF_THE_WEEK, VALID_LEC_TYPES, Lecture, Course} = require('./ScheduleBuild');
const DAYS_OF_THE_WEEK_KEYS = Object.keys(DAYS_OF_THE_WEEK);

const lectureTypeConverter = (typeInHebrew) =>{
    if(typeInHebrew === "מעבדה"){
        return VALID_LEC_TYPES.Lab;
    }
    if(typeInHebrew === "הרצאה"){
        return VALID_LEC_TYPES.Lec;
    }
    if(typeInHebrew === "תרגיל"){
        return VALID_LEC_TYPES.Ter;
    }
    throw new Error("Invalid Type");
}

const lectureDayOfTheWeekConverter = (dayOfTheWeekNumber) =>{
    return DAYS_OF_THE_WEEK_KEYS[dayOfTheWeekNumber];
}

const convertJsonLectureClasesIntoObject = (jsonLectureClassesArray, courseId, lectureType, lecturerName) =>{
    const resultingLectures = [];
    for(let i = 0; i < jsonLectureClassesArray.length; i++){
        resultingLectures.push(new Lecture(lectureType, jsonLectureClassesArray[i]["startHour"], jsonLectureClassesArray[i]["endHour"],
        lectureDayOfTheWeekConverter(jsonLectureClassesArray[i]["day"]), courseId, lecturerName));
    }
    if(resultingLectures.length <= 1){
        return resultingLectures[0];
    }
    return resultingLectures;
};

/*
    {A,B} , {C,D}. => {A1, B1},  {}
*/


/** This function Convertes The  Json Data that is recieved from the DB into a course Object.
 * 
 * @param {*} courseDataArray The Json Data that was recieved from the DataBase
 * @param {*} courseName (Optional) will represent the name of the course.
 * @returns A new course Object that represents the Json data that was Recieved.
 */
function convertCourseJsonIntoObject(courseDataArray, courseName = "NULL"){
    if(!courseDataArray){
        return courseDataArray;
    }

    const courseId = parseInt(courseDataArray[0]["courseId"]);
    const lecturesDataObject = {"Lec":[], "Ter":[], "Lab":[]};
    
    for(const lectureObject of courseDataArray){

        const lectureType = lectureTypeConverter(lectureObject["type"]);

        lecturesDataObject[lectureType].push(convertJsonLectureClasesIntoObject(lectureObject["classes"], courseId, lectureType,
            lectureObject["lecturerName"]));
    }
    return new Course(courseId, lecturesDataObject["Lec"], lecturesDataObject["Ter"], lecturesDataObject["Lab"], courseName);
}


module.exports = {convertCourseJsonIntoObject};