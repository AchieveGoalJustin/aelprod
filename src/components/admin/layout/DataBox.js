import React from "react";

import { Container, Flex, Text, Box } from "@chakra-ui/react";

const DataBox = ({ data, title, datatype }) => {
  return (
    <Container
      bgColor="gray.50"
      px={5}
      py={3}
      my={5}
      outline={"#C8C8C8 solid 2px"}
    >
      {!data ? (
        <Text fontWeight={"bold"} fontSize="xl" mb={3}>
          {`No ${datatype} selected`}
        </Text>
      ) : (
        <>
          <Text fontWeight={"bold"} fontSize="xl" mb={3}>
            {title}
          </Text>
          <Container>
            <Flex flexDir={"column"}>
              {Object.entries(data).map((item, i) => {
                const itemToCaps =
                  item[0].charAt(0).toUpperCase() + item[0].slice(1);
                return (
                  <Box key={i}>
                    <Text mt={2} fontStyle={"italic"}>
                      {itemToCaps + ":"}
                    </Text>
                    <Text color="blue">{item[1]}</Text>
                  </Box>
                );
              })}
            </Flex>
          </Container>
        </>
      )}
    </Container>
  );
};

export default DataBox;
