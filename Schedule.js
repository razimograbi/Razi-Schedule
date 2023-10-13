const {Lecture,Course,DAYS_OF_THE_WEEK,} = require("./ScheduleBuild");
const {Filter} = require('./Filtering/filter');

const MAX_NUMBER_OF_FINAL_SCHEDULES = 2;

class ScheduleManager{
    constructor(coursesArray){
        this.finalSchedule = [];
        this.coursesArray = coursesArray;
        this._mappingCourseIdToAllPossibleScheduleCombination = {};
    }

    _seperateLecturesIntoBuckets(lecturesMatrix){
        const buckets = {};
        Object.keys(DAYS_OF_THE_WEEK).forEach(day => {buckets[day] = []});

        lecturesMatrix.forEach(lectureArray => {
            lectureArray.forEach(lecture => {
                if(Array.isArray(lecture)){
                    buckets[lecture[0].dayOfWeek].push(lecture[0]);
                    buckets[lecture[1].dayOfWeek].push(lecture[1]);
                }else{
                    buckets[lecture.dayOfWeek].push(lecture);
                }
            });
        });
        return buckets;
    }


    _isBucketScheduledCorrectly(currentBucket){ // O(n*log(n))
        if(currentBucket.length <= 1){
            return true;
        }
        //sort bucket
        currentBucket.sort((element1, element2) => {return element2.timeInMinutes().end - element1.timeInMinutes().end});

        for (let i = 0; i < currentBucket.length - 1; i++) {
            let leftLectureTimeObject = currentBucket[i].timeInMinutes();
            let rigthLectureObjectTime = currentBucket[i + 1].timeInMinutes();

            if(leftLectureTimeObject.start < rigthLectureObjectTime.end){
                return false;
            }
        }
        return true;
    }

    isScheduleLegal(currentCoursesArray){ // [[lec1, ter1], [lec2, ter2], ...]
        // seperate all lectures in one array
        //const lecturesArray = [];
        //currentCoursesArray.forEach(lectures => {lecturesArray.push([...lectures])});
        if(currentCoursesArray.length <= 1){
            return true;
        }

        const buckets = this._seperateLecturesIntoBuckets(currentCoursesArray);
        
        // for each bucket check if a possible schedule is possable
        for(const day in buckets){
            if(!this._isBucketScheduledCorrectly(buckets[day])){
                return false;
            }
        }
        return true;
    }


    generateCombinations(courseIndex = 0, currentCombination = []) {
        const courseIds = Object.keys(this._mappingCourseIdToAllPossibleScheduleCombination);
        if(this.finalSchedule.length > MAX_NUMBER_OF_FINAL_SCHEDULES - 1){
            return;
        }
        if(courseIndex === courseIds.length) {
            this.finalSchedule.push([...currentCombination]);
            return;
        }
      
        const courseId = courseIds[courseIndex];
        const courseMatrix = this._mappingCourseIdToAllPossibleScheduleCombination[courseId];

        for(let i = 0; i < courseMatrix.length; i++){
            currentCombination.push(courseMatrix[i]);
            if(this.isScheduleLegal(currentCombination)){
                this.generateCombinations(courseIndex + 1, currentCombination);
            }
            currentCombination.pop();
        }
    }


    checkIfAnyCombinationIsPossible(filterParametersList = null){
        const allPossibleCombinationsForEachCourse = {}; // {courseId1 : [ [], [], [] ], courseId2 : [ [], [], [] ]  }

        if(filterParametersList){
            const filter = new Filter(this.coursesArray);
            if(filter.applyFilter(filterParametersList)){ // the filtered courses are legal
                this.coursesArray = filter.courses;
            }else{
                return false;
            }
        }

        for(let i = 0; i < this.coursesArray.length; i++){
            allPossibleCombinationsForEachCourse[this.coursesArray[i]['id']] = this.coursesArray[i].generateAllScheduleCombinations(); // matrix
        }

        //check if one of the courses does not have any legal internal schedule. (Extra Step)
        Object.keys(allPossibleCombinationsForEachCourse).forEach(courseId => {
            if(allPossibleCombinationsForEachCourse[courseId].length === 0){
                return false;
            }
        });

        this._mappingCourseIdToAllPossibleScheduleCombination = allPossibleCombinationsForEachCourse;

        this.generateCombinations();
        console.log(this.finalSchedule.length);
        return !!(this.finalSchedule.length);
    }


}


module.exports = {ScheduleManager};

