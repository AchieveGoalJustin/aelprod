const dataParser = {
  parseCourseList(courseArray, fullDataList) {
    let returnArray = [];
    courseArray.forEach((course) => {
      if (fullDataList[course.toLowerCase()]) {
        returnArray.push({
          [course]: fullDataList[course.toLowerCase()].course,
        });
      }
    });
    return returnArray;
  },
  parseVideoList(courseArray, fullDataList) {

    console.log("All Data:")

    let returnArray = [];
    courseArray.forEach((course) => {
      console.log("Parsing");
      console.log(course);
      console.log("From");
      console.log(courseArray);
      returnArray.push({
        [course]: fullDataList[course.toLowerCase()].videos,
      });
      console.log("parsed successfully");
      console.log(returnArray);
    });
    return returnArray;
  },
};

export default dataParser;
