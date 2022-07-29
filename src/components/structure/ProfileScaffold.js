import React from "react";

import { Box, Grid, GridItem, Text, Flex, Spacer } from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

const ProfileScaffold = ({ children }) => {
  return (
    <Box flex="1 1" bgColor={"gray.50"}>
      <Grid
        templateColumns={[
          "1fr 5fr",
          "1fr 5fr",
          "1fr 5fr",
          "1fr 6fr",
          "1fr 7fr",
        ]}
        gap={0}
        height="100%"
        overflow="hidden"
      >
        <GridItem height="100%" bgColor={"blue.400"} maxW={"200px"}>
          <Box mt={5} mx={3} px={4} bgColor="blue.100" boxShadow={"md"}>
            <Flex alignItems={"center"}>
              <Text>ログイン履歴</Text>
              <Spacer />
              <ChevronRightIcon w={8} h={8} />
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <Box height="80vh" overflow="auto" grow={1} m={5}>
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfileScaffold;
