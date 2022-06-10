import React from "react";

import { Box, Flex } from "@chakra-ui/react";

import { PlayBtn } from "../icons/PlayBtn";

import { useState, useEffect } from "react";

const PlayButton = ({ handlePlayerButton }) => {
  const [key, setKey] = useState();

  useEffect(() => {
    document.addEventListener("keydown", (e) => setKey(e.key));
    return () => document.removeEventListener("keydown", (e) => setKey(e.key));
  });

  useEffect(() => {
    if (key === " ") {
      handlePlayerButton();
    }
  }, [key]);

  return (
    <Box
      bg="white"
      onClick={handlePlayerButton}
      as="button"
      boxShadow={"lg"}
      borderRadius={"50%"}
      width={12}
      height={12}
      _hover={{ bg: "#EEE" }}
      _active={{
        bg: "#DDD",
        transform: "scale(0.95)",
        boxShadow: "none",
      }}
    >
      <Flex alignItems={"center"} w={"100%"} h={"100%"} justifyContent="center">
        <PlayBtn mt={3} ms={4} w={7} h={7} color="blue.400" />
      </Flex>
    </Box>
  );
};

export default PlayButton;
