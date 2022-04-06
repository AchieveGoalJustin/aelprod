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
import { useCookies } from 'react-cookie'
import cookie from 'js-cookie'

import { API, graphqlOperation } from 'aws-amplify'
import { listAccounts, listSchools, listUsers } from '../../graphql/queries'

// import axios from "axios";

import { sign } from "jsonwebtoken";
// import { serialize } from "cookie";

import _ from 'lodash'


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
    return token;
  };

  // const serializeCookie = (token) => {
  //   const serialized = serialize("AELJWT", token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV !== "development",
  //     sameSite: "strict",
  //     maxAge: 60 * 60 * 24 * 30,
  //     path: "/",
  //   });
  //   console.log("Serialized");
  //   return serialized;
  // };


  const authenticate = async (credentials) => {

    let authenticated = true

    const { username, password, accountNo, schoolNo } = credentials
    const schoolList = await API.graphql(graphqlOperation(listSchools))
    const userList = await API.graphql(graphqlOperation(listUsers))
    const accountList = await API.graphql(graphqlOperation(listAccounts))

    console.log(schoolList)
    console.log(userList)
    console.log(accountList)
    console.log(credentials)

    const fetchedSchool = _.find(schoolList.data.listSchools.items, (school) => {
      return school.number === schoolNo
    })

    const fetchedAccount = _.find(accountList.data.listAccounts.items, (account) => {
      return account.number === accountNo
    })

    const fetchedUser = _.find(userList.data.listUsers.items, (user) => {
      return user.username === username
    })


    const isSchool = Boolean(fetchedSchool)

    const isAccount = Boolean(fetchedAccount)

    const isUser = Boolean(fetchedUser)




    if (isSchool && isUser && isAccount) {
      if (username !== fetchedUser.username || password !== fetchedUser.password) {
        authenticated = false
        console.log('Username or password is incorrect')
      }

      if (schoolNo !== fetchedSchool.number || accountNo !== fetchedAccount.number) {
        authenticated = false
        console.log('School number or account number is incorrect')
      }

      if (authenticated) {

        const user = {
          username: fetchedUser.username,
          id: schoolNo + '-' + accountNo + '-' + fetchedUser.number,
          perm: fetchedAccount.permissions,

        }

        const token = signToken(user);

        cookie.set('AELJWT', token, { expires: 3 / 24 })
        successToast({
          title: "ログインしました！",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAuthComplete(true)
      } else {
        failToast({
          title: "ログイン出来ませんでした",
          description: 'ユーザー名、パスワード、または講座番号正しくないです',
          status: "error",
          duration: 3000,
          isClosable: true,
        });

      }

    } else {
      failToast({
        title: "ログイン出来ませんでした",
        description: 'エラーが発生しました。再入力をお願いします',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const router = useRouter();
  const [schoolNo, setSchoolNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [authComplete, setAuthComplete] = useState(false)
  const [show, setShow] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(auth)
  // const [cookies, setCookie, removeCookie] = useCookies(['AELJWT'])

  const successToast = useToast();
  const failToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { schoolNo, accountNo, username, password };
    try {
      const authawait = await authenticate(credentials)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authComplete === true) {
      router.replace("/user/dashboard")
    }
  }, [authComplete])

  return (
    <VStack background="white" px={4} py={5} borderRadius="md">
      <Heading pb={4}>ユーザーログイン</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <FormLabel alignSelf="left">ユーザー名</FormLabel>
        </Container>
        <Input
          w={"80%"}
          placeholder="AchieveTaro"
          variant="filled"
          id="1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Container pt={3}>
          <FormLabel>講座番号</FormLabel>
        </Container>
        <Flex w={60}>
          <Input
            maxLength={4}
            w={"50%"}
            placeholder="1234"
            variant="filled"
            id="2"
            value={schoolNo}
            onChange={(e) => setSchoolNo(e.target.value)}
          />
          <Text mx={2} fontSize="xl">
            -
          </Text>
          <Input
            maxLength={2}
            w={"25%"}
            variant="filled"
            placeholder="56"
            id="3"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </Flex>
        <Container pt={3}>
          <FormLabel>パスワード</FormLabel>
        </Container>
        <InputGroup w={"80%"}>
          <Input
            variant="filled"
            type={show ? "text" : "password"}
            id="4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
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
