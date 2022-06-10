import React from "react";

import { Container, Flex, Text } from "@chakra-ui/react";

const DataBox = ({ data, title }) => {
  return (
    <Container
      bgColor="gray.50"
      px={5}
      py={3}
      my={5}
      outline={"#C8C8C8 solid 2px"}
    >
      <Text fontWeight={"bold"} fontSize="xl">
        {title}
      </Text>
      <Container>
        <Flex flexDir={"column"}>
          {Object.entries(data).map((item) => {
            const itemToCaps =
              item[0].charAt(0).toUpperCase() + item[0].slice(1);
            return (
              <>
                <Text mt={2} fontStyle={"italic"}>
                  {itemToCaps + ":"}
                </Text>
                <Text color="blue">{item[1]}</Text>
              </>
            );
          })}
        </Flex>
      </Container>
    </Container>
  );
};

export default DataBox;
