import React from "react";

import SideNavContainer from "../../components/navigation/SideNavContainer";

import CourseContext from "../../context/CourseContext";
import { useContext } from "react";
import CourseList from "../../components/CourseList";

import { Box, Grid, GridItem } from "@chakra-ui/react";

const ContentSegment = ({ children, content, test }) => {
  const { viewMode } = useContext(CourseContext);


  return (
    <Box flex="1 1" bgColor={"gray.50"}>
      <Grid templateColumns={["1fr 5fr", "1fr 5fr", "1fr 5fr", "1fr 6fr", "1fr 7fr"]} gap={0} height="100%" overflow="hidden">
        <GridItem height="100%" bgColor={"blue.400"} maxW={"200px"}>
          <Box>
            <SideNavContainer content={content} />
          </Box>
        </GridItem>
        <GridItem>
          <Box height="80vh" overflow="auto" grow={1} m={5}>
            {!(viewMode === "test") ? (
              children
            ) : (
              <>
                <CourseList courses={content.courses} />
              </>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ContentSegment;
