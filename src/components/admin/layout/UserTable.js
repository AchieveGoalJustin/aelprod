import React, { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  position,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

const UserTable = ({ data, tableMode, setTableMode }) => {
  const [deleteList, setDeleteList] = useState([]);
  const [amountSelected, setAmountSelected] = useState(0);
  const [checklistState, setChecklistState] = useState(true);
  const [updateBox, setUpdateBox] = useState(null);
  const [today, setToday] = useState(null);

  const hanldeCheckList = (e, id) => {
    if (e.target.checked) {
      if (tableMode === "delete") {
        setDeleteList([...deleteList, id]);
        setAmountSelected((amountSelected) => amountSelected + 1);
      } else if (tableMode === "update") {
        setUpdateBox(id);
        setAmountSelected((amountSelected) => amountSelected + 1);
      }
    } else {
      setAmountSelected((amountSelected) => amountSelected - 1);
      deleteList.splice(deleteList.indexOf(id), 1);
    }
  };

  const handleIsChecked = (id) => {
    if (tableMode === "update") {
      id === updateBox ? true : false;
    } else if (tableMode === "delete") {
      deleteList.includes(id) ? true : false;
    }
  };

  const handleIsDisabled = (id) => {
    switch (tableMode) {
      case "disabled":
        return true;
      case "delete":
        return false;
      case "update":
        if (amountSelected < 1) {
          console.log("enabled");
          return false;
        } else if (amountSelected >= 1 && id !== updateBox) {
          console.log("disabled");
          return true;
        }
    }
  };

  const handleTableMode = (mode, amountSelected) => {
    setAmountSelected(0);
    setUpdateBox(null);
    setDeleteList([]);
    switch (mode) {
      case "disabled":
        return true;
      case "delete":
        return false;
      case "update":
        if (amountSelected < 1) {
          return false;
        } else if (amountSelected >= 1) {
          return true;
        }
    }
  };

  const handleDate = (date) => {
    let now = new Date(Date.now());
    let converted = new Date(date);
    converted = converted.getTime();
    console.log(now - converted);
    if (now - converted < 86400000) {
      return <CheckCircleIcon color="green.600" />;
    }
  };

  useEffect(() => {
    setChecklistState(handleTableMode(tableMode, amountSelected));
    console.log(checklistState);
  }, [tableMode]);

  useEffect(() => {
    console.log(amountSelected);
    console.log(deleteList);
    console.log(updateBox);
    console.log(tableMode);
  }, [amountSelected, deleteList, updateBox, tableMode]);

  useEffect(() => {}, []);
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>User #</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Select</Th>
            <Th w={10}>Recent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.number}</Td>
                <Td>{user.username}</Td>
                <Td>{user.password}</Td>
                <Td>
                  <Checkbox
                    ms={4}
                    bg="white"
                    colorScheme={"green"}
                    isDisabled={handleIsDisabled(user.id)}
                    onChange={(e) => {
                      hanldeCheckList(e, user.id);
                    }}
                    isChecked={handleIsChecked(user.id)}
                  />
                </Td>
                <Td>{handleDate(user.createdAt)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
