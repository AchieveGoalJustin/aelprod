import React, { useState, useEffect, useContext } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { updateSchool } from "../../graphql/mutations";

import {
  useDisclosure,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  Text,
  Container,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

import AdminContext from "../../context/AdminContext";

const UpdateSchool = ({ school }) => {
  const { setAccountIsLoaded } = useContext(AdminContext);

  const [expireDate, setExpireDate] = useState();
  const [name, setName] = useState(school.name);
  const [number, setNumber] = useState(school.number);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let data = "";
  let entriesArray = [];

  if (school !== "No School Selected") {
    data = { ...school };
    delete data.accounts;
    delete data.id;
    delete data.updatedAt;
    delete data.createdAt;
    console.log(data);
    console.log(school);
    entriesArray = Object.entries(data);
  }

  const handleOperation = () => {
    console.log("click");
  };

  const handleUndo = () => {
    setName(school.name);
    setNumber(school.number);
    console.log(name, number);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {}, [name, number]);

  return (
    <Container bgColor="gray.50" p={5} my={10} outline={"#C8C8C8 solid 2px"}>
      <Text fontWeight={"bold"}>Updating:</Text>
      <Box py={15} px={50}>
        <Container>
          <Box>
            <Text>Name:</Text>
            <Input
              placeholder={data.name}
              value={name}
              onChange={handleNameChange}
            ></Input>
          </Box>
          <Box>
            <Text>Number:</Text>
            <Input
              placeholder={data.number}
              value={number}
              onChange={handleNumberChange}
            ></Input>
          </Box>
        </Container>
      </Box>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "No school selected"} */}
      <Flex flexDir={"row-reverse"}>
        <Button onClick={onOpen} colorScheme="green">
          Update
        </Button>
        <Button colorScheme="yellow" mx={3} onClick={handleUndo}>
          Undo
          <RepeatClockIcon mx={2} />
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update School</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To confirm updating the information, please type in the current
              name of the school.
            </Text>
            <Text fontWeight={"bold"} mt={4}>
              This action cannot be undone.
            </Text>
            <Input placeholder={school.name} my={4} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={console.log("update")}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UpdateSchool;
