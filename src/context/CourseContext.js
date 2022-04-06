import { createContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState({ error: "No course" });
  const [currentTest, setCurrentTest] = useState({ error: "No Test" });
  const [courseList, setCourseList] = useState({ error: "No course list" });
  const [viewMode, setViewMode] = useState("test");

  return (
    <CourseContext.Provider
      value={{
        currentCourse,
        setCurrentCourse,
        currentTest,
        setCurrentTest,
        setCourseList,
        courseList,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
