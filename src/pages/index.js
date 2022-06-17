import LoginBox from "../components/login/LoginBox";

import Head from "next/head";

import { ChakraProvider } from "@chakra-ui/provider";
import { extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast, Spinner, Flex, Spacer } from "@chakra-ui/react";

import { requireAuthentication } from "../components/HOC/ProtectPath";

import cookies from "js-cookie";

export default function Home({ msg, auth }) {
  const overrides = extendTheme({
    styles: {
      global: {
        body: {
          bg: "blue.300",
        },
      },
    },
  });

  const messageToast = useToast();
  const [toastIsDisplayed, setSetIsDisplayed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (msg) {
      messageToast({
        title: msg,
        description: "",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setSetIsDisplayed(true);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (toastIsDisplayed) {
      cookies.remove("message");
    }
  }, [toastIsDisplayed]);

  return (
    <>
      <Head>
        <title>AEL - ユーザーログイン</title>
      </Head>
      {isLoaded ? (
        <ChakraProvider theme={overrides}>
          <LoginBox auth={auth} />
        </ChakraProvider>
      ) : (
        <Flex flexDir="column" alignItems="center" w="100%" h="100vh">
          <Spacer />
          <Spinner
            m={"auto"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Spacer />
        </Flex>
      )}
    </>
  );
}

export const getServerSideProps = requireAuthentication(async (ctx) => {
  let msg = ctx.req.cookies.message;

  if (!msg) {
    msg = "";
  }

  ctx.res.setHeader("Set-Cookie", ["message=deleted; Max-Age=0"]);

  return {
    props: {
      msg: msg,
    },
  };
});
