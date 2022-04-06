import React from "react";
import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { MdAccountCircle } from "react-icons/md";

const UserMenuDropdown = ({ menuprops, username }) => {
  return (
    <Menu>
      <MenuButton
        py={3}
        variant="outline"
        colorScheme="blue"
        fontWeight="bold"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <Flex>
          <Icon me={2} w={8} h={8} color={"blue.500"} as={MdAccountCircle} />
          <Text
            m={"auto"}
            fontWeight="bold"
            fontSize={[".5em", ".75em", "1em", "1em"]}
            color={"blue.500"}
          >
            {username}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        {menuprops.map(item => <MenuItem><Link href={item.url}>{item.text}</Link></MenuItem>)}
        {/* <MenuItem>
          <Link href={menuprops.url1}>{menuprops.text1}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={menuprops.url2}>{menuprops.text2}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={menuprops.url3}>{menuprops.text3}</Link>
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default UserMenuDropdown;
