import React from "react";
import SignOutButton from "./SignOutButton";
import UserMenuDropdown from "./UserMenuDropdown";

import { Image, Box, Flex } from "@chakra-ui/react";

import NextLink from "next/link";

const Navbar = ({ perm, username }) => {
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
    {
      text: "プロフィール",
      url: "#"
    },
    {
      text: "ダッシュボード",
      url: "#"
    },
  ];

  const home = {
    src: "/",
    text: "トップページへ",
  };

  const courses = {
    src: "/user/courses/",
    text: "コース一覧",
  };

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

        {//<NavMenuLink menuprops={about} />
        }
      </Flex>
      <Flex justifyContent="right" flexDir={"row"} width={"45%"}>
        {//<NavLink linkinfo={home} />
          //<NavLink linkinfo={courses} />
        }
        <UserMenuDropdown menuprops={user} username={username} />
        <SignOutButton />
      </Flex>
    </Flex>
  );
};

export default Navbar;
