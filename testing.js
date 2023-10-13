const {Lecture,Course,VALID_LEC_TYPES,DAYS_OF_THE_WEEK,} = require("./ScheduleBuild");
const {ScheduleManager} = require('./Schedule');
const {Filter, SKIP} = require('./Filtering/filter');


const course1 = new Course(
  2501,
  [
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "08:30",
      "10:30",
      DAYS_OF_THE_WEEK.Sunday,
      2501,
      "Razi"
    ),

    new Lecture(
      VALID_LEC_TYPES.Lec,
      "10:30",
      "12:30",
      DAYS_OF_THE_WEEK.Sunday,
      2501,
      "MOHAMMED"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "11:30",
      "15:30",
      DAYS_OF_THE_WEEK.Sunday,
      2501,
      "MOSA"
    ),
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "10:30",
      "12:30",
      DAYS_OF_THE_WEEK.Monday,
      2501,
      "MOHAMMED"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "14:30",
      "16:30",
      DAYS_OF_THE_WEEK.Wednesday,
      2501,
      "JAJA"
    )
  ],

  [],
  "Hedva"
);



const course2 = new Course(
  1234,
  [
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "11:30",
      "13:30",
      DAYS_OF_THE_WEEK.Tuesday,
      1234,
      "Bob"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "15:30",
      "17:30",
      DAYS_OF_THE_WEEK.Wednesday,
      1234,
      "Bob"
    ),
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "09:30",
      "11:30",
      DAYS_OF_THE_WEEK.Wednesday,
      1234,
      "David"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "12:00",
      "14:00",
      DAYS_OF_THE_WEEK.Wednesday,
      1234,
      "Eve"
    ),
  ],

  [],
  "Dan"
);



const course3 = new Course(
  4567,
  [
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "13:00",
      "15:00",
      DAYS_OF_THE_WEEK.Sunday,
      4567,
      "Frank"
    ),

    new Lecture(
      VALID_LEC_TYPES.Lec,
      "15:30",
      "17:30",
      DAYS_OF_THE_WEEK.Friday,
      4567,
      "Grace"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "18:00",
      "20:00",
      DAYS_OF_THE_WEEK.Thursday,
      4567,
      "Helen"
    ),
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "13:30",
      "15:30",
      DAYS_OF_THE_WEEK.Friday,
      4567,
      "Ivy"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "16:00",
      "18:00",
      DAYS_OF_THE_WEEK.Tuesday,
      4567,
      "Jack"
    ),
  ],

  [],
  "Jessica"
);



const course4 = new Course(
  7890,
  [
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "09:30",
      "12:30",
      DAYS_OF_THE_WEEK.Wednesday,
      7890,
      "Linda"
    ),

    new Lecture(
      VALID_LEC_TYPES.Lec,
      "13:00",
      "15:00",
      DAYS_OF_THE_WEEK.Sunday,
      7890,
      "Mike"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "16:30",
      "18:30",
      DAYS_OF_THE_WEEK.Tuesday,
      7890,
      "Nancy"
    ),
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "09:30",
      "11:30",
      DAYS_OF_THE_WEEK.Monday,
      7890,
      "Oscar"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "13:00",
      "15:00",
      DAYS_OF_THE_WEEK.Thursday,
      7890,
      "Pam"
    ),
  ],

  [],
  "Quincy"
);


const course5 = new Course(
  5555,
  [
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "08:00",
      "10:00",
      DAYS_OF_THE_WEEK.Thursday,
      5555,
      "Professor A"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "09:30",
      "11:30",
      DAYS_OF_THE_WEEK.Friday,
      5555,
      "Professor B"
    ),
    new Lecture(
      VALID_LEC_TYPES.Lec,
      "12:30",
      "15:30",
      DAYS_OF_THE_WEEK.Sunday,
      5555,
      "Professor WALT"
    ),
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "10:00",
      "12:00",
      DAYS_OF_THE_WEEK.Friday,
      5555,
      "Professor C"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "11:30",
      "13:30",
      DAYS_OF_THE_WEEK.Monday,
      5555,
      "Professor D"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "17:30",
      "18:30",
      DAYS_OF_THE_WEEK.Tuesday,
      5555,
      "Professor WTF"
    ),
  ],

  [],
  "Course Coordinator"
);




const course6 = new Course(
  12345,
  [
    [   new Lecture(
        VALID_LEC_TYPES.Lec,
        "08:00",
        "10:00",
        DAYS_OF_THE_WEEK.Monday,
        12345,
        "Professor A"
      )
      ,
      new Lecture(
        VALID_LEC_TYPES.Lec,
        "09:30",
        "11:30",
        DAYS_OF_THE_WEEK.Friday,
        12345,
        "Professor B"
      ),
    ],
    [   new Lecture(
      VALID_LEC_TYPES.Lec,
      "10:00",
      "12:00",
      DAYS_OF_THE_WEEK.Tuesday,
      12345,
      "Professor BABY"
        )
      ,
      new Lecture(
      VALID_LEC_TYPES.Lec,
      "09:30",
      "11:30",
      DAYS_OF_THE_WEEK.Thursday,
      12345,
      "Professor JACK"
      ),
    ]
  ],

  [
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "10:00",
      "12:00",
      DAYS_OF_THE_WEEK.Friday,
      12345,
      "Professor C"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "11:30",
      "13:30",
      DAYS_OF_THE_WEEK.Monday,
      12345,
      "Professor D"
    ),
    new Lecture(
      VALID_LEC_TYPES.Ter,
      "08:30",
      "10:00",
      DAYS_OF_THE_WEEK.Friday,
      12345,
      "Professor D"
    ),
  ],

  [new Lecture(VALID_LEC_TYPES.Lab, "7:30", "8:30", DAYS_OF_THE_WEEK.Monday, 12345, "RAZI")],
  "Course Coordinator"
);


const coursesArray = [course6, course1, course3, course4, course2, course5];
//const coursesArray = [course1, course2, course3, course4, course5];


const manager = new ScheduleManager(coursesArray);

manager.checkIfAnyCombinationIsPossible();

console.log(manager.finalSchedule[0]);

//const filter = new Filter(coursesArray);

/*
filter.applyFilter([{lectureType:SKIP,coursesIds:SKIP, teachers:SKIP, days:SKIP,
   hours:[{start:"12:30", end:"13:30"}], onlyKeepGivenParameters:false}]);

*/



//console.log(filter.checkIfCoursesAfterFilterationAreLegal());
/*
manager.checkIfAnyCombinationIsPossible([{lectureType:SKIP,coursesIds:SKIP, teachers:SKIP, days:SKIP,
  hours:[{start:"18:30", end:"20:00"}], onlyKeepGivenParameters:false}]);

*/

//manager.checkIfAnyCombinationIsPossible([{lectureType:SKIP,coursesIds:SKIP, teachers:SKIP, days:[DAYS_OF_THE_WEEK.Sunday],hours:SKIP, onlyKeepGivenParameters:false}]);