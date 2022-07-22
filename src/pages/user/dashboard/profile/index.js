//React
import React from "react";
import { useContext, useEffect, useState } from "react";

//Next
import Head from "next/head";

//Chakra
import { Flex } from "@chakra-ui/react";

//Utils
import jwt from "jsonwebtoken";

//HOC
import { requireAuthentication } from "../../../../components/HOC/ProtectPath";

//Components
import Navbar from "../../../../components/navigation/Navbar";
import Footer from "../../../../components/structure/Footer";
import ProfileScaffold from "../../../../components/structure/ProfileScaffold";
import LoginHistory from "../../../../components/profile/LoginHistory";

const userProfile = ({ perm, username }) => {
  // On Render
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>AEL - プロフィール</title>
      </Head>
      <Flex flexDir={"column"} height={"100vh"}>
        <Navbar perms={perm} username={username} />
        <ProfileScaffold grow={1} basis="auto">
          <LoginHistory />
        </ProfileScaffold>
        <Footer />
      </Flex>
    </>
  );
};

export const getServerSideProps = requireAuthentication(async (context) => {
  const user = context.req.cookies.AELJWT;
  let perm = [];
  let username = "";
  let currentUserId = "";
  if (user) {
    const decUser = jwt.decode(user);
    if (decUser.courses.length > 0) {
      perm = decUser.courses;
      username = decUser.username;
      currentUserId = decUser.id;
    } else {
      perm = "No available courses";
    }
  }

  return {
    props: {
      username: username,
      perm: perm,
      currentUserId: currentUserId,
    },
  };
});

export default userProfile;
