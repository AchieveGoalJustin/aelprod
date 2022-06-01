import React from "react";

import { useRouter } from "next/router";

import {
  Text,
  Heading,
  Box,
  Container,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";

const UnderConstruction = () => {
  const router = useRouter();
  return (
    <>
      <Box minH={"100vh"} minW={"100vw"}>
        <Container mt={"10%"}>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Image src="/UnderConstruction.png" />
            <Heading py={4}>準備中です。</Heading>
            <Text>
              申し訳ございませんが、只今このページは閲覧いただけません。
            </Text>
            <Button
              mt={5}
              size="lg"
              colorScheme="blue"
              onClick={() => router.back()}
            >
              戻る
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default UnderConstruction;
