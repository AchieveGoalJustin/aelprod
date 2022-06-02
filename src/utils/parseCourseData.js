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
    let returnArray = [];
    courseArray.forEach((course) => {
      returnArray.push({
        [course]: fullDataList[course.toLowerCase()].videos,
      });
    });
    return returnArray;
  },
};

export default dataParser;
