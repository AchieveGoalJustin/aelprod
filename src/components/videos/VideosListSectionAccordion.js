import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

import VideoCardList from "./VideoCardList";

const VideosListSectionAccordion = ({
  videoPaths,
  sectionTitle,
  videoMetaData,
  videos,
}) => {
  return (
    <Accordion allowToggle mx={4} bg={`${videoMetaData.theme}.50`}>
      <AccordionItem my={4}>
        <AccordionButton bg={`${videoMetaData.theme}.200`}>
          <Box flex="1">
            <Heading>{sectionTitle}</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <VideoCardList
            videoPaths={videoPaths}
            videoMetaData={videoMetaData}
            videos={videos}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default VideosListSectionAccordion;
