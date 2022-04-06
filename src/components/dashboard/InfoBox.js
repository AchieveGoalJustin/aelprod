import React from "react";
import {
  Box,
  Heading,
  ListItem,
  ListIcon,
  Text,
  List,
  Flex,
} from "@chakra-ui/react";

import { CheckCircleIcon, WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";

const InfoBox = ({ box }) => {
  const iconEval = (string) => {
    switch (string) {
      case "warning":
        return { icon: WarningTwoIcon, color: "orange.500" };
      case "error":
        return { icon: WarningIcon, color: "red.500" };
      default:
        return { icon: CheckCircleIcon, color: "green.500" };
    }
  };

  return (
    <Box
      p={4}
      borderRadius={"md"}
      shadow="lg"
      px={6}
      py={3}
      bgColor={"gray.100"}
    >
      <Heading size="md" p={3} fontWeight="bold">
        {box.text}
      </Heading>
      <List>
        {box.items.map((item, i) => (
          <ListItem fontSize="md" my={2} key={i}>
            <Flex alignItems={"center"}>
              <ListIcon
                as={iconEval(item.icon).icon}
                color={iconEval(item.icon).color}
              />
              <Text>{item.text}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InfoBox;
