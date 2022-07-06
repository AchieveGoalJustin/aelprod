import React, { useEffect, useState, useContext } from "react";

import { CSVDownload } from "react-csv";

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
  const [csvIsdownload, setCsvIsDownload] = useState(false);
  const [csvPassword, setCsvPassword] = useState([]);
  const [csvUsername, setCsvUsername] = useState([]);
  const [csvNumber, setCsvNumber] = useState([]);
  const [csvHeader, setCsvHeader] = useState([
    "number",
    "username",
    "password",
  ]);
  const [amountSelected, setAmountSelected] = useState(0);
  const [checklistState, setChecklistState] = useState(true);
  const [updateBox, setUpdateBox] = useState(null);
  const [sortedData, setSortedData] = useState([]);

  const { deleteList, setDeleteList, tableMode } = useContext(AdminContext);

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
      case "generate":
        return true;
      case "create":
        return true;
      case "delete":
        return false;
      case "update":
        if (amountSelected < 1) {
          return false;
        } else if (amountSelected >= 1 && id !== updateBox) {
          return true;
        }
    }
  };

  const handleTableMode = (mode, amountSelected) => {
    setAmountSelected(0);
    setUpdateBox(null);
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
    }
  };

  const handleDate = (date) => {
    let now = new Date(Date.now());
    let converted = new Date(date);
    if (now - converted < 86400000) {
      return <CheckCircleIcon color="green.600" />;
    }
  };

  const handleCsv = () => {
    const numberArray = sortedData.map((user) => {
      return user.number;
    });
    const usernameArray = sortedData.map((user) => {
      return user.username;
    });
    const passwordArray = sortedData.map((user) => {
      return user.password;
    });

    setCsvNumber(numberArray);
    setCsvUsername(usernameArray);
    setCsvPassword(passwordArray);
    setCsvIsDownload(true);
    console.log("csv download");
  };

  useEffect(() => {
    setChecklistState(handleTableMode(tableMode, amountSelected));
  }, [tableMode]);

  useEffect(() => {
    setSortedData(
      data.sort(
        (a, b) => parsers.stringToInt(a.number) - parsers.stringToInt(b.number)
      )
    );
  }, [data]);

  useEffect(() => {
    if (csvIsdownload) {
      setCsvIsDownload(false);
    }
  }, [csvIsdownload]);

  useEffect(() => {
    console.log(tableMode);
    console.log(deleteList);
  });

  return (
    <TableContainer>
      <Button colorScheme="green" size="sm" my={2} onClick={handleCsv}>
        Download CSV
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
      {csvIsdownload ? <CSVDownload data={sortedData} target="" /> : ""}
    </TableContainer>
  );
};

export default UserTable;
