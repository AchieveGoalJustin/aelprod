import React from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

const NavLink = ({ linkinfo }) => {
  return (
    <NextLink href={linkinfo.src} passHref>
      <Button
        as="a"
        colorScheme="red"
        variant="ghost"
        fontWeight="bold"
        size="md"
      >
        {linkinfo.text}
      </Button>
    </NextLink>
  );
};

export default NavLink;
