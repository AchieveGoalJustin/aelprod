import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import PaginateButtons from "./PaginateButtons";
import TablePage from "./TablePage";

const LoginHistory = () => {
  const [debugData, setDebugData] = useState({});
  const [loginHistory, setLoginHistory] = useState([]);
  const [isPaginated, setIsPaginated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  function paginateHistory(history) {
    let paginatedArray = [];
    let pageCount = 1;

    if (history.length > 7) {
      pageCount = Math.ceil(history.length / 7);
      setDebugData((debugData) => ({ ...debugData, pageCount: pageCount }));
      for (let i = 0; i < pageCount; i++) {
        let pushArray = history.splice(0, 7);
        setDebugData((debugData) => ({ ...debugData, pushArray: pushArray }));
        paginatedArray.push(pushArray);
      }
      setIsPaginated(true);
      setDebugData((debugData) => ({
        ...debugData,
        paginatedArray: paginatedArray,
      }));
      setLoginHistory(paginatedArray);
    } else {
      setIsPaginated(false);
      setLoginHistory([history]);
    }
  }

  useEffect(() => {
    let parsedLoginHistory = localStorage.getItem("loginHistory");

    parsedLoginHistory = JSON.parse(parsedLoginHistory);

    parsedLoginHistory = parsedLoginHistory.map((item) => parseInt(item));

    parsedLoginHistory.sort((a, b) => b - a);

    paginateHistory(parsedLoginHistory);
  }, []);

  useEffect(() => {
    console.log("debug Data:");
    console.log(debugData);
  }, [debugData]);

  return (
    <Container maxW={"800px"} p={4} boxShadow={"md"} bg={"white"}>
      <Heading my={2}>ログイン履歴</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme={"blue"}>
          <Thead>
            <Tr>
              <Th>曜日</Th>
              <Th>日付</Th>
              <Th>時間</Th>
            </Tr>
          </Thead>
          <TablePage pageData={loginHistory[currentPage]} />
        </Table>
      </TableContainer>
      <Box>
        {isPaginated && (
          <PaginateButtons
            loginHistory={loginHistory}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
      <Box>{JSON.stringify(debugData)}</Box>
    </Container>
  );
};

export default LoginHistory;
