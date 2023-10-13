const axios = require('axios');
const {convertCourseJsonIntoObject} = require('./converter');
const {ScheduleManager} = require('./Schedule');

//const coursesIds = [61181, 61761, 61763, 61773, 61775, 61776, 61765, 61759];
const coursesIds = [61181, 61761, 61763, 61773, 61775, 61776];
//const coursesIds = [61181, 61761, 61759, 61763];
const coursesArray = [];

/*
    For each course id inside the coursesIds, you will make and http request to the braudeOverflow Website to get the courses lectures + 
    tergols + labs, then you will use the converter to convert all the lectures courses and labs into a course Object.
    After that you will run the Schedule Class To Build a Schedule from all the courses.
*/






async function retrieveCourseInfoFromDB(courseId){
    try{
        const {data} = await axios.get('https://braudeoverflow-387422.oa.r.appspot.com/courses/groups/' + courseId);
        coursesArray.push(convertCourseJsonIntoObject(data));  
    }catch(error){
        console.log(error);
        return null;
    }
}



async function start(){
    const promisesList = [];
    for(const courseId of coursesIds){
        try{
            promisesList.push(retrieveCourseInfoFromDB(courseId));
        }catch(error){
            console.log(error);
            return 1;
        }
    }

    await Promise.all(promisesList);
    const manager = new ScheduleManager(coursesArray);
    if(manager.checkIfAnyCombinationIsPossible()){
        for(let i = 0; i < manager.finalSchedule[0].length; i++){
            console.log("The " + i + "'th place : ");
            console.log(manager.finalSchedule[0][i]);
            console.log("\n\n");
        }
    }else{
        console.log("NONE WERE FOUND!");
    }
}

start();
