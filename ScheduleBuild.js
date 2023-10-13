const DAYS_OF_THE_WEEK = {Sunday:"Sunday",Monday:"Monday", Tuesday:"Tuesday", Wednesday:"Wednesday", Thursday:"Thursday", Friday:"Friday", Saturday:"Saturday"};
const VALID_LEC_TYPES = {Lec:"Lec", Ter:"Ter", Lab:"Lab"};

class Lecture {
    constructor(lectureType, startTime, endTime, dayOfWeek, courseId,  professorName = "NULL") {
      this.professorName = professorName;
      this.setLectureType(lectureType);
      this.startTime = startTime;
      this.endTime = endTime;
      this.setDayOfWeek(dayOfWeek);
      this.courseId = courseId;
    }
    setLectureType(lectureType) {
        if (lectureType in VALID_LEC_TYPES) {
          this.lectureType = lectureType;
        } else {
          throw new Error("Invalid lecture type. Valid types are: Lec, Ter, Lab");
        }
    }
    
    setDayOfWeek(dayOfWeek) {
        if (dayOfWeek in DAYS_OF_THE_WEEK) {
          this.dayOfWeek = dayOfWeek;
        } else {
          throw new Error("Invalid day of the week. Please provide a valid day.");
        }
    }

    timeInMinutes() {
        // Assuming lecture times are in the "HH:mm" format, you can convert them to minutes for comparison
        const startTime = this.startTime.split(":");
        const endTime = this.endTime.split(":");
        const startTimeMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
        const endTimeMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
        return {start: startTimeMinutes, end: endTimeMinutes};
    }

    copy(){
        return new Lecture(this.lectureType, this.startTime, this.endTime, this.dayOfWeek, this.courseId, this.professorName);
    }



    toString(){
        return `lec1 : Type : ${this.lectureType},Start :  ${this.startTime}, End :  ${this.endTime}, Prof Name : ${this.professorName} `;
    }

    equals(otherLecture){
        if(!otherLecture || ! otherLecture instanceof Lecture){
            return false;
        }

        return otherLecture.lectureType === this.lectureType && otherLecture.startTime === this.startTime &&
         otherLecture.endTime === this.endTime && otherLecture.dayOfWeek === this.dayOfWeek && otherLecture.courseId === this.courseId;

    }

}


class Course{
    constructor(id, lectures, tergols, labs, courseName = "NULL"){
        this.lectures = lectures;
        this.tergols = tergols;
        this.labs = labs;
        this.id = id;
        this.courseName = courseName;
    }


    generateAllScheduleCombinations(){
        const nonEmptyLectureArrays = [this.lectures, this.tergols, this.labs].filter(item => item.length > 0);
        const matrixScheduleCombination = this._allCoursesCombinations(nonEmptyLectureArrays);
        return matrixScheduleCombination.filter((scheduleArray) => {
            return this._checkForConflicts(scheduleArray);
        });
    }

    _checkForConflicts(lecturesArray){
        const lecturesArrayWithoutInternalArrays = [];
        lecturesArray.forEach(lecture =>{
           if(Array.isArray(lecture)){
            lecturesArrayWithoutInternalArrays.push(...lecture);
           }else{
            lecturesArrayWithoutInternalArrays.push(lecture);
           }
        });

        // sort the lectures based on end time in decending order
        lecturesArrayWithoutInternalArrays.sort((element1, element2) => {return element2.timeInMinutes().end - element1.timeInMinutes().end});
        for (let i = 0; i < lecturesArrayWithoutInternalArrays.length - 1; i++) {

            if(lecturesArrayWithoutInternalArrays[i].dayOfWeek !== lecturesArrayWithoutInternalArrays[i + 1].dayOfWeek){
                continue;
            }

            let leftLectureTimeObject = lecturesArrayWithoutInternalArrays[i].timeInMinutes();
            let rigthLectureObjectTime = lecturesArrayWithoutInternalArrays[i + 1].timeInMinutes();

            if(leftLectureTimeObject.end >= rigthLectureObjectTime.end && rigthLectureObjectTime.end > leftLectureTimeObject.start){
                return false;
            }
        }
        return true;
    }

    // returns a matrix of all possible combinations of lectures + tergols + labs. Ex [[l1, t1], [l2, t1]].
    
    _allCoursesCombinations(arrays, currentIndex = 0, currentCombination = [], combinations = []){
        if (currentIndex === arrays.length){
            if (currentCombination.length === arrays.length) {
                combinations.push([...currentCombination]);
            }
            return;
        }
        
        // could be two options 1.currentArray = [lec1, lec2, lec3] or 2. currentArray = [{lec1,lec2}, {lect3, lec4}] 
        const currentArray = arrays[currentIndex];
        for (let i = 0; i < currentArray.length; i++) {
            currentCombination[currentIndex] = currentArray[i];
            this._allCoursesCombinations(arrays, currentIndex + 1, currentCombination, combinations);
        }
        return combinations;
    }

    deepCopy(){
        const copiedId = this.id;
        const lecturesCopy = [];
        const tergolsCopy = [];
        const labsCopy = [];

        this.lectures.forEach(lecture => {
            if(lecture instanceof Lecture){
                lecturesCopy.push(lecture.copy());
            }else{ // it is an array with 2 lectures inside of it.
                lecturesCopy.push([lecture[0].copy(), lecture[1].copy()]);
            }
        });
        this.tergols.forEach(tergol => {
            if(tergol instanceof Lecture){
                tergolsCopy.push(tergol.copy());
            }else{ // it is an Array with 2 lectures inside of it.
                tergolsCopy.push([tergol[0].copy(), tergol[1].copy()]);
            }
        });
        this.labs.forEach(lab => {
            if(lab instanceof Lecture){
                labsCopy.push(lab.copy());
            }else{ // it is an Array with 2 lectures inside of it.
                labsCopy.push([lab[0].copy(), lab[1].copy()]);
            }
        });
        return new Course(copiedId, lecturesCopy, tergolsCopy, labsCopy, this.courseName);
    }

}



module.exports = {Lecture, Course, VALID_LEC_TYPES, DAYS_OF_THE_WEEK};



