import React from "react";

import {
  Flex,
  ButtonGroup,
  Button,
  Text,
  Spacer,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import VolumeControl from "./VolumeControl";

const TopBar = ({
  dataIndex,
  duration,
  formatTime,
  isMax,
  currentPlaying,
  isYoshu,
  isFukushu,
  handleQuestionType,
  handleQuestionNumberLeft,
  handleQuestionNumberRight,
}) => {
  return (
    <Flex alignItems="center" ps={2}>
      <Flex
        alignItems="center"
        width="100%
        "
      >
        <ButtonGroup size="md" isAttached boxShadow="lg">
          <Button
            outline={isYoshu && "2px solid blue"}
            isDisabled={isYoshu && true}
            color="white"
            bg="blue.400"
            onClick={handleQuestionType}
          >
            予習
          </Button>
          <Button
            outline={isFukushu && "2px solid red"}
            isDisabled={isFukushu && true}
            color="white"
            bg="red.400"
            onClick={handleQuestionType}
          >
            復習
          </Button>
        </ButtonGroup>
        <Spacer />
        <Heading
          color={isYoshu ? "blue.800" : isFukushu && "red.800"}
          bg="white"
          borderRadius="md"
          size="lg"
          p={2}
        >
          {isYoshu ? "予習" : isFukushu && "復習"}
        </Heading>
        <Spacer />
        <ButtonGroup isAttached boxShadow="md">
          {!(dataIndex === 0) ? (
            <Box
              onClick={handleQuestionNumberLeft}
              as="button"
              bg="white"
              p={2}
              py={1}
              boxShadow="md"
              borderRadius="md"
              _hover={{ bg: "#EEE" }}
              _active={{
                bg: "#DDD",
                transform: "scale(0.95)",
                boxShadow: "none",
              }}
            >
              <ArrowLeftIcon h={3} w={3} />
            </Box>
          ) : (
            <Box
              bg="gray.400"
              as="button"
              p={2}
              py={1}
              borderRadius="md"
              _hover={{ cursor: "not-allowed" }}
            >
              <ArrowLeftIcon h={3} w={3} />
            </Box>
          )}
          <Text
            bg={isYoshu ? "blue.50" : isFukushu && "red.50"}
            fontSize="lg"
            p={2}
            ps={5}
            pe={3}
            fontWeight="bold"
          >
            {isYoshu
              ? "問題" + (currentPlaying ? " - " + currentPlaying.id + " " : "")
              : isFukushu &&
                "問題" +
                  (currentPlaying ? " - " + currentPlaying.id + " " : "")}{" "}
          </Text>
          <Text
            bg={isYoshu ? "blue.50" : isFukushu && "red.50"}
            fontSize="lg"
            p={2}
            ps={3}
            pe={5}
            borderLeft="1px solid lightgray"
          >
            {" "}
          {!isNaN(duration) ? " " + formatTime(duration) : " 00:00"}
          </Text>
          {!isMax ? (
            <Box
              onClick={handleQuestionNumberRight}
              as="button"
              bg="white"
              p={2}
              py={1}
              boxShadow="md"
              borderRadius="md"
              _hover={{ bg: "#EEE" }}
              _active={{
                bg: "#DDD",
                transform: "scale(0.95)",
                boxShadow: "none",
              }}
            >
              <ArrowRightIcon h={3} w={3} />
            </Box>
          ) : (
            <Box
              bg="gray.400"
              as="button"
              p={2}
              py={1}
              borderRadius="md"
              _hover={{ cursor: "not-allowed" }}
            >
              <ArrowRightIcon h={3} w={3} />
            </Box>
          )}
        </ButtonGroup>
        <Spacer />
        <Spacer />
        <VolumeControl isYoshu={isYoshu} isFukushu={isFukushu} />
      </Flex>
    </Flex>
  );
};

export default TopBar;
