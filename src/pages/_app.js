import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "../context/SessionContext";
import { AdminProvider } from "../context/AdminContext";
import { DataProvider } from "../context/DataContext";

import SiteProgBar from "../components/loaders/SiteProgBar";

import { extendTheme } from "@chakra-ui/react";

import Router from "next/router";
import Head from "next/head";

import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

const theme = extendTheme({
  colors: {
    brown: {
      50: "#fbf9f6",
      100: "#f4ece4",
      200: "#ecdfd1",
      300: "#e3d0bc",
      400: "#dabfa5",
      500: "#cfad8b",
      600: "#c3986d",
      700: "#b47e48",
      800: "#9f5b17",
      900: "#643200",
    },
  },
  fonts: {
    heading: "M PLUS 1p, sans-serif",
    body: "M PLUS 1p, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    if (Router.pathname !== `${process.env.PATH_ROOT}/user/profile`) {
      setIsLoading(true);
    }
  });
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  Router.events.on("routeChangeError", () => setIsLoading(false));

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {isLoading ? (
        <SiteProgBar />
      ) : (
        <SessionProvider>
          <AdminProvider>
            <DataProvider>
              <Component {...pageProps} />
            </DataProvider>
          </AdminProvider>
        </SessionProvider>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
