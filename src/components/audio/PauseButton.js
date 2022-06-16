import React from "react";

import { Box, Flex } from "@chakra-ui/react";

import { PauseBtn } from "../icons/PauseBtn";

import { useEffect, useState } from "react";

const PauseButton = ({ handlePlayerButton }) => {
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
      boxShadow={"md"}
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
        <PauseBtn mt={2} ms={3} w={7} h={7} color="red.500" />
      </Flex>
    </Box>
  );
};

export default PauseButton;