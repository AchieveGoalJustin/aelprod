const parseCourses = (perm, coursedata) => {
  const courses = coursedata.filter((course) => {
    if (perm.includes(course.abbr)) {
      return true;
    }
  });

  const longTests = courses.map((course) => {
    return course.test;
  });

  const tests = [...new Set(longTests)];
  return { courses: courses, tests: tests };
};

export default parseCourses;
