const SKIP = "SKIP";

/**
 * Is used to identify the filter options and specify what to filter. Use SKIP to the particular parameter.
 * 
 * . Each Field can be an array of Strings.
 */
const _filterParameter = {lectureType:SKIP,coursesIds:SKIP, teachers:SKIP, days:SKIP, hours:SKIP, onlyKeepGivenParameters:true};




/**
 * class provides a flexible way to filter courses based on user-defined criteria,
 *  allowing them to keep or remove lectures and tergols based on specific attributes like teachers, days, and hours.
 */


class Filter{
    constructor(arrayOfCourses){
        this.courses = arrayOfCourses.map((course) => course.deepCopy());
        this.originalCourses = arrayOfCourses;
    }

    _checkIfCoursesAfterFilterationAreLegal(){
        if(this.courses.length !== this.originalCourses.length){
            return false;
        }
        for(let i = 0; i < this.originalCourses.length; i++){
            const originalCourse = this.originalCourses[i];
            const filteredCourse = this.courses[i];

            if(originalCourse.lectures.length > 0 && filteredCourse.lectures.length === 0){
                return false;
            }
            if(originalCourse.tergols.length > 0 && filteredCourse.tergols.length === 0){
                return false;
            }
            if(originalCourse.labs.length > 0 && filteredCourse.labs.length === 0){
                return false;
            }
        }
        return true;
    }

    _teachersFilter(lecture, parameter, onlyKeepGivenParameters = true){ 
        if(parameter === SKIP || !parameter){
            return true;
        }
        return parameter.includes(lecture.professorName) === onlyKeepGivenParameters; // XNOR
    }

    _daysFilter(lecture, parameter, onlyKeepGivenParameters = true){
        if(parameter === SKIP || !parameter){
            return true;
        }
        return parameter.includes(lecture.dayOfWeek) === onlyKeepGivenParameters; // XNOR
    }

    _hoursFilter(lecture, parameter, onlyKeepGivenParameters = true){
        if(parameter === SKIP || !parameter){
            return true;
        }
        const lectureTimeInMinutes = lecture.timeInMinutes();

        for(let i = 0; i < parameter.length; i++){
            const currentTimeObject = parameter[i];
            
            const startTime = currentTimeObject.start.split(":");
            const endTime = currentTimeObject.end.split(":");
            const startTimeMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
            const endTimeMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);


            if(onlyKeepGivenParameters){
                if(!(endTimeMinutes >= lectureTimeInMinutes.end && startTimeMinutes <= lectureTimeInMinutes.start)){
                    return false;
                }
                continue;
            }

            if(!(endTimeMinutes <= lectureTimeInMinutes.start || lectureTimeInMinutes.end <= startTimeMinutes)){
                return false;
            }
        }
        return true;
    }

    _checkFilterParameters(filterParameters){
        if(!filterParameters){
            throw new Error("Illegal filterParameters Given");
        }

        const parametersKeys = Object.keys(filterParameters);

        if(filterParameters.hasOwnProperty("lectureType")){
            if(filterParameters["lectureType"] !== SKIP && filterParameters["onlyKeepGivenParameters"]){
                throw new Error("Cannot onlyKeepGivenParameters and at the same time use lectureType" +
                 ", please change to onlyRemove. set(onlyKeepGivenParameters) to false");
            }
        }


        if(filterParameters.hasOwnProperty("coursesIds")){
            if(filterParameters["coursesIds"] !== SKIP && filterParameters["onlyKeepGivenParameters"]){
                throw new Error("Cannot onlyKeepGivenParameters and at the same time use coursesIds" +
                 ", please change to onlyRemove. set(onlyKeepGivenParameters) to false");
            }
        }

        // check if all Object attributes are Empty (Equal to SKIP)
        let skipCount = 0;
        parametersKeys.forEach((key) => {
            if(filterParameters[key] === SKIP){
                skipCount += 1;
            }
        });
        if(skipCount === parametersKeys.length){
            throw new Error("All Attributes Cannot Be SKIP");
        }

    }

    /**
     * Apply filteration to courses, by the filterParameters.
     * @param {(Array(Object))} filterParametersList 
     * @returns - a boolean value indicating if the result of the filteration is legal.
     */
    applyFilter(filterParametersList){
        for(const filterParameters of filterParametersList){
            this._checkFilterParameters(filterParameters);
            this._filter(filterParameters, this.courses);
        }
        console.log("Done Applying Filter");
        return this._checkIfCoursesAfterFilterationAreLegal();
    }


    _filter(filterParameters, courses){

        for(const course of courses){
            if(filterParameters.hasOwnProperty("coursesIds") &&
               filterParameters["coursesIds"] !== SKIP &&
               !filterParameters["coursesIds"].includes(course.id.toString()) ){
                continue;
            }

            course.lectures = course.lectures.filter((lecture) => {
                if(filterParameters.hasOwnProperty("lectureType") &&
                   filterParameters["lectureType"] !== SKIP && 
                   !filterParameters["lectureType"].includes(lecture.lectureType)){
                    return true;
                }
                return this._teachersFilter(lecture, filterParameters["teachers"], filterParameters["onlyKeepGivenParameters"]) &&
                       this._daysFilter(lecture, filterParameters["days"], filterParameters["onlyKeepGivenParameters"]) &&
                       this._hoursFilter(lecture, filterParameters["hours"], filterParameters["onlyKeepGivenParameters"]);
                
            });

            course.tergols = course.tergols.filter((tergol) => {
                if(filterParameters.hasOwnProperty("lectureType") &&
                   filterParameters["lectureType"] !== SKIP && 
                   !filterParameters["lectureType"].includes(tergol.lectureType)){
                    return true;
                }
                return this._teachersFilter(tergol, filterParameters["teachers"], filterParameters["onlyKeepGivenParameters"]) &&
                       this._daysFilter(tergol, filterParameters["days"], filterParameters["onlyKeepGivenParameters"]) &&
                       this._hoursFilter(tergol, filterParameters["hours"], filterParameters["onlyKeepGivenParameters"]);
            });

        }
    }

}


module.exports = {Filter, SKIP};