import React from "react";

import { useEffect, useState } from "react";

import {
  Progress,
  VStack,
  Heading,
  Image,
  Container,
  Box,
  Flex,
} from "@chakra-ui/react";

const SiteProgBar = () => {
  const [timer, setTimer] = useState(null);
  const [barValue, setBarValue] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setBarValue((barValue) => barValue + 1);
      }, 50)
    );
  }, []);

  useEffect(() => {
    if (barValue === 100) {
      clearInterval(timer);
    }
  }, [barValue]);

  return (
    <Box h={"100vh"} w={"100vw"} pt={"20vh"}>
      <Container>
        <VStack spacing={6}>
          <Image src="/AELLogoFUll.png" priority={"true"} />
          {/* <Image src="/AELLogoShadowless.png" mb={55} /> */}
          <Heading fontWeight="bold" textAlign="center" size="lg">
            少々お待ちください
          </Heading>
          <Flex w={"100%"}>
            {showBar ? (
              <Box
                w={"100%"}
                bg={"blue.100"}
                p={2}
                borderRadius={"md"}
                boxShadow={"md"}
              >
                <Progress
                  value={barValue}
                  w={"100%"}
                  hasStripe
                  borderRadius={"md"}
                  height={"32px"}
                  bg={"gray.200"}
                />
              </Box>
            ) : (
              <Image
                src="/Loader200px.svg"
                maxW={125}
                margin={"auto"}
                priority={true}
              />
            )}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default SiteProgBar;
