import React from "react";
import VideoModal from "./VideoModal";
import { Flex, Wrap } from "@chakra-ui/react";

const VideoCardList = ({ videoPaths, videoMetaData, videos }) => {
  return (
    <Flex flexDir="row">
      <Flex mt={10}>
        <Wrap spacing="15px">
          {videos.map((video) => {
            return (
              <VideoModal
                key={video.id}
                video={video}
                colorTheme={videoMetaData.theme}
                videoPaths={videoPaths}
              />
            );
          })}
        </Wrap>
      </Flex>
    </Flex>
  );
};

export default VideoCardList;
