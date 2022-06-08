import React from "react";

import {
  Flex,
  ButtonGroup,
  Button,
  Text,
  Spacer,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import VolumeControl from "./VolumeControl";

const TopBar = ({
  dataIndex,
  isMax,
  currentPlaying,
  formatTime,
  duration,
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
        <ButtonGroup size="sm" isAttached boxShadow="md">
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
            fontWeight="bold"
          >
            {isYoshu
              ? "予習問題" + (currentPlaying ? " - " + currentPlaying.id : "")
              : isFukushu &&
                "復習問題" + (currentPlaying ? " - " + currentPlaying.id : "")}
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
        <VolumeControl isYoshu={isYoshu} isFukushu={isFukushu} />
      </Flex>
    </Flex>
  );
};

export default TopBar;
