import React from "react";
import { MenuButton, Menu, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

const NavMenuLink = ({ menuprops }) => {
  return (
    <Menu>
      <MenuButton
        mx={3}
        colorScheme="blue"
        fontWeight="bold"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {menuprops.text}
      </MenuButton>
      <MenuList>
        <MenuItem>

          <Link href={menuprops.url1}>{menuprops.text1}</Link>
        </MenuItem>
        <MenuItem>

          <Link href={menuprops.url2}>{menuprops.text2}</Link>
        </MenuItem>
        <MenuItem>

          <Link href={menuprops.url3}>{menuprops.text3}</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenuLink;
