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
} from "@chakra-ui/react";

const UserTable = ({ data }) => {
  const [deleteList, setDeleteList] = useState([]);

  const hanldeDeleteList = (e, id) => {
    if (e.target.checked) {
      setDeleteList([...deleteList, id]);
    }
    console.log(deleteList);
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>User #</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Select</Th>
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
                    onChange={(e) => {
                      hanldeDeleteList(e, user.id);
                    }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
