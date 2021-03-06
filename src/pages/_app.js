import { ChakraProvider } from "@chakra-ui/react";
import { CourseProvider } from "../context/CourseContext";
import { SessionProvider } from "../context/SessionContext";
import { DataProvider } from "../context/DataContext";
import { VideoProvider } from "../context/VideoContext";
import { extendTheme } from "@chakra-ui/react";
import Head from 'next/head'


// import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// const client = new AWSAppSyncClient({
//   url: awsconfig.aws_appsync_graphqlEndpoint,
//   region: awsconfig.aws_appsync_region,
//   auth: {
//     type: AUTH_TYPE.API_KEY,
//     apiKey: awsconfig.aws_appsync_apiKey,
//   },
// });


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
    heading: 'M PLUS 1p, sans-serif',
    body: 'M PLUS 1p, sans-serif'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap");
        </style>
      </Head>
      <CourseProvider>
        <VideoProvider>
          <SessionProvider>
            <DataProvider>
              <Component {...pageProps} />
            </DataProvider>
          </SessionProvider>
        </VideoProvider>
      </CourseProvider>
    </ChakraProvider>
  );
}

export default MyApp;
