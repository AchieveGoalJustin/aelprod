import React from "react";
import LoginData from "./LoginData";
import {
  Heading,
  HStack,
  Center,
  Container,
  Image,
  VStack,
} from "@chakra-ui/react";

const LoginBox = ({ auth }) => {
  return (
    <Center>
      <HStack background="red.500" borderRadius="md" mt="20vh" boxShadow="md">
        <VStack>
          <Image
            mb={5}
            src={`${process.env.NEXT_PUBLIC_BRANDING_ROOT}/logo/AEL-E.png`}
          />
          <Container mb={5}>
            <Heading size="md" color="white">
              Achieve English Learningへ
            </Heading>
            <Heading size="xl" color="white">
              ようこそ!
            </Heading>
          </Container>
          <Container>
            <Heading fontWeight="normal" color="white">
              さぁ、始めよう！
            </Heading>
          </Container>
        </VStack>
        <LoginData auth={auth} />
      </HStack>
    </Center>
  );
};

export default LoginBox;
