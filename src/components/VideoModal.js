import React, { useState, useContext } from "react";
import CourseContext from "../context/CourseContext";
import VideoContext from "../context/VideoContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Container,
  Flex,
  Image,
  Box,
  Heading,
  Link,
} from "@chakra-ui/react";
import VideoCard from "./VideoCard";

const VideoModal = ({ video }) => {
  const { currentVideo, setCurrentVideo } = useContext(VideoContext);
  const { setViewMode } = useContext(CourseContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    setCurrentVideo(video);
    setViewMode("video");
  };

  return (
    <>
      <Box as="button" onClick={onOpen}>
        <VideoCard video={video} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{video.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column">
              <Image
                borderRadius="md"
                src={`${process.env.NEXT_PUBLIC_EK3_ROOT}/EK3/EK3TN/EK3TN-${video.day}.png`}
              />
              <Container>
                <Heading my={2}>レッスン内容</Heading>
                <Text>
                  {video.longDesc}
                </Text>
              </Container>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme="red" onClick={handleClick}>
              今すぐ見る！
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoModal;
