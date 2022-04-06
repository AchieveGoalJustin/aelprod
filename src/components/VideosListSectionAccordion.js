import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

import CourseContext from "../context/CourseContext";
import VideoContext from "../context/VideoContext";

import VideoCardList from "./VideoCardList";

const VideosListSectionAccordion = ({ videos, sectionTitle, videoMetaData }) => {


  return (
    <Accordion allowToggle mx={4} bg="blue.50" >
      <AccordionItem my={4}>
        <AccordionButton bg="blue.200">
          <Box flex="1">
            <Heading>{sectionTitle}</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <VideoCardList videos={videos} videoMetaData={videoMetaData} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default VideosListSectionAccordion;
