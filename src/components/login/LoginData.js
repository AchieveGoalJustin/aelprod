import React, { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Text,
  Input,
  Heading,
  Button,
  Flex,
  FormLabel,
  useToast,
  InputGroup,
  InputRightAddon,
  Icon,
} from "@chakra-ui/react";

import { FaEyeSlash, FaEye } from "react-icons/fa";

import { sign } from "jsonwebtoken";
import cookie from "js-cookie";

import fetchUser from "../../utils/fetchUser";

import _ from "lodash";

import Link from "next/link";
import { useRouter } from "next/router";

const LoginData = ({ auth }) => {
  const secret = process.env.NEXT_PUBLIC_AUTH_SK;

  const signToken = (user) => {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //30 Days
        id: user.id,
        username: user.username,
        courses: user.perm,
      },
      secret
    );
    setUserPerm(user.perm);
    return token;
  };

  const authenticate = async (credentials) => {
    const authStatus = await fetchUser(credentials);

    if (!authStatus.error && Object.keys(authStatus).length !== 0) {
      const user = {
        username: authStatus.username,
        id: authStatus.id,
        perm: authStatus.perm,
      };

      const token = signToken(user);

      cookie.set("AELJWT", token, { expires: 3 / 24 });

      successToast({
        title: "ログインしました！",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAuthComplete(true);
    } else {
      failToast({
        title: "ログイン出来ませんでした",
        description: authStatus.error,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      setErrorCode(authStatus.code);
    }
  };

  const router = useRouter();
  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [authComplete, setAuthComplete] = useState(false);
  const [show, setShow] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(auth);
  const [errorCode, setErrorCode] = useState(0);
  const [userPerm, setUserPerm] = useState("");

  const successToast = useToast();
  const failToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { school, account, username, password };
    try {
      const authawait = await authenticate(credentials);
    } catch (err) {
    }
  };

  useEffect(() => {
    if (authComplete === true) {
      if (userPerm.includes("ADM")) {
        router.replace("/user/admin/gqladmin");
      } else {
        router.replace("/user/dashboard");
      }
    }
  }, [authComplete]);

  useEffect(() => {
    errorCode !== 0 && console.log("Error thrown with error code: ", errorCode);
  }, [errorCode]);

  return (
    <VStack background="white" px={4} py={5} borderRadius="md">
      <Heading pb={4}>ユーザーログイン</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <FormLabel alignSelf="left">ユーザー名</FormLabel>
        </Container>
        {errorCode === 3 ? (
          <Input
            isInvalid
            w={"80%"}
            placeholder="AchieveTaro"
            variant="filled"
            id="1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bgColor="red.100"
          ></Input>
        ) : (
          <Input
            w={"80%"}
            placeholder="AchieveTaro"
            variant="filled"
            id="1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        )}
        <Container pt={3}>
          <FormLabel>登録番号</FormLabel>
        </Container>
        <Flex w={60}>
          {errorCode === 1 ? (
            <Input
              isInvalid
              maxLength={4}
              w={"50%"}
              placeholder="1234"
              variant="filled"
              id="2"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              bgColor="red.100"
            />
          ) : (
            <Input
              maxLength={4}
              w={"50%"}
              placeholder="1234"
              variant="filled"
              id="2"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          )}
          <Text mx={2} fontSize="xl">
            -
          </Text>
          {errorCode === 2 ? (
            <Input
              isInvalid
              maxLength={2}
              w={"25%"}
              variant="filled"
              placeholder="56"
              id="3"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              bgColor="red.100"
            />
          ) : (
            <Input
              maxLength={2}
              w={"25%"}
              variant="filled"
              placeholder="56"
              id="3"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          )}
        </Flex>
        <Container pt={3}>
          <FormLabel>パスワード</FormLabel>
        </Container>
        <InputGroup w={"80%"}>
          {errorCode === 3 ? (
            <Input
              isInvalid
              variant="filled"
              type={show ? "text" : "password"}
              id="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              backgroundColor="red.100"
            ></Input>
          ) : (
            <Input
              variant="filled"
              type={show ? "text" : "password"}
              id="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          )}
          <InputRightAddon
            bgColor="blue.600"
            as="button"
            type="button"
            onClick={() => setShow(!show)}
          >
            <Icon as={show ? FaEyeSlash : FaEye} color="gray.100" />
          </InputRightAddon>
        </InputGroup>
        <Container py={4} align="right">
          <Button colorScheme="blue" type="submit" disabled={buttonEnabled}>
            ログイン
          </Button>
        </Container>
        <Text fontSize="xs">
          アカウントをお持ちではない方はこちらへ
          <Link href="/info">
            <Text as="span" color="blue.400" _hover="blue.100">
              参照
            </Text>
          </Link>
          ください。
        </Text>
      </form>
    </VStack>
  );
};

export default LoginData;
