import React, { useEffect, useState, useContext, createRef } from "react";

import { CSVLink } from "react-csv";

import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  position,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import AdminContext from "../../../context/AdminContext";

import * as parsers from "../../../utils/database/numberParsers";

const UserTable = ({ data }) => {
  const [csvData, setCsvData] = useState(data);
  const [amountSelected, setAmountSelected] = useState(0);
  const [checklistState, setChecklistState] = useState(true);
  const [sortedData, setSortedData] = useState([]);

  const {
    deleteList,
    setDeleteList,
    tableMode,
    schoolName,
    currentAccount,
    updateUser,
    setUpdateUser,
  } = useContext(AdminContext);

  const csvLink = createRef();

  const handleCheckList = (e, id) => {
    if (e.target.checked) {
      if (tableMode === "delete") {
        setDeleteList([...deleteList, id]);
        setAmountSelected((amountSelected) => amountSelected + 1);
      } else if (tableMode === "update") {
        setUpdateUser(id);
        setAmountSelected((amountSelected) => amountSelected + 1);
      }
    } else {
      setAmountSelected((amountSelected) => amountSelected - 1);
      // setDeleteList((deleteList) =>
      //   deleteList.splice(deleteList.indexOf(id), 1)
      // );
      deleteList.splice(deleteList.indexOf(id), 1);
      setUpdateUser(null);
    }
  };

  const handleIsChecked = (id) => {
    if (tableMode === "update") {
      if (id === updateUser) {
        return true;
      } else {
        return false;
      }
    } else if (tableMode === "delete") {
      // deleteList.includes(id) ? true : false;
      if (deleteList.includes(id)) {
        return true;
      } else {
        return false;
      }
    } else if (
      tableMode === "reset" ||
      tableMode === "generate" ||
      tableMode === "reset"
    ) {
      return false;
    }
  };

  const handleIsDisabled = (id) => {
    switch (tableMode) {
      case "generate":
        return true;
      case "create":
        return true;
      case "delete":
        return false;
      case "update":
        if (amountSelected < 1 || id === updateUser) {
          return false;
        } else if (amountSelected >= 1 && id !== updateUser) {
          return true;
        }
      case "reset":
        return true;
    }
  };

  const handleTableMode = (mode, amountSelected) => {
    setAmountSelected(0);
    setUpdateUser(null);
    setDeleteList([]);
    switch (mode) {
      case "generate":
        return true;
      case "create":
        return true;
      case "delete":
        return false;
      case "update":
        if (amountSelected < 1) {
          return false;
        } else if (amountSelected >= 1) {
          return true;
        }
      case "reset":
        return false;
    }
  };

  const handleDate = (date) => {
    let now = new Date(Date.now());
    let converted = new Date(date);
    if (now - converted < 86400000) {
      return <CheckCircleIcon color="green.600" />;
    }
  };

  const initializeCsvData = () => {
    let newCsvData = sortedData.map((datum) => Object.assign({}, datum));
    newCsvData.forEach((datum) => {
      delete datum.accountUsersId;
      return (datum.number = `=""${datum.number}""`);
    });
    setCsvData(newCsvData);
  };

  const handleCsv = () => {
    csvLink.current.link.click();
  };

  useEffect(() => {
    setChecklistState(handleTableMode(tableMode, amountSelected));
  }, []);

  useEffect(() => {
    handleTableMode(tableMode, amountSelected);
  }, [tableMode]);

  useEffect(() => {
    if (sortedData) {
      initializeCsvData();
    }
  }, [sortedData]);

  useEffect(() => {
    setSortedData(
      data.sort(
        (a, b) => parsers.stringToInt(a.number) - parsers.stringToInt(b.number)
      )
    );
  }, [data]);

  return (
    <TableContainer>
      <Button colorScheme="green" size="sm" my={2} onClick={handleCsv}>
        Download CSV
        <CSVLink
          data={csvData ? csvData : data}
          target=""
          filename={schoolName + "-" + currentAccount.number}
          ref={csvLink}
        />
      </Button>
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
          {sortedData.map((user) => {
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
                    isChecked={handleIsChecked(user.id)}
                    isDisabled={handleIsDisabled(user.id)}
                    onChange={(e) => {
                      handleCheckList(e, user.id);
                    }}
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
