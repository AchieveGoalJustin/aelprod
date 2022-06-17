import React from "react";
import SignOutButton from "./SignOutButton";
import UserMenuDropdown from "./UserMenuDropdown";

import { Image, Box, Flex } from "@chakra-ui/react";

import NextLink from "next/link";

const Navbar = ({ username }) => {
  const about = {
    text: "About",
    url1: "/info",
    text1: "About",
    url2: "/info/faq",
    text2: "FAQ",
    url3: "/info/contact",
    text3: "Contact",
  };

  const user = [
    // {
    //   text: "プロフィール",
    //   url: `${process.env.NEXT_PUBLIC_PATH_ROOT}/user/dashboard/profile/`,
    //   key: 1,
    // },
    {
      text: "ダッシュボード",
      url: `${process.env.NEXT_PUBLIC_PATH_ROOT}/user/dashboard/`,
      key: 2,
    },
  ];

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      alignItems={"center"}
      wrap="wrap"
      w="100%"
      bgColor="grey.300"
      color="red.500"
      boxShadow="md"
      position="static"
      p={3}
    >
      <Flex
        w={["80%", "40%", "30%"]}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <NextLink href="#">
          <Box
            as="a"
            _hover={{
              cursor: "pointer",
            }}
          >
            <Image
              maxH="60px"
              src={`${process.env.NEXT_PUBLIC_BRANDING_ROOT}/logo/AELロゴ.png`}
            />
          </Box>
        </NextLink>
      </Flex>
      <Flex justifyContent="right" flexDir={"row"} width={"45%"}>
        <UserMenuDropdown menuprops={user} username={username} />
        <SignOutButton />
      </Flex>
    </Flex>
  );
};

export default Navbar;
