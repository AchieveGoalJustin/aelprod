import React from "react";

import { Tbody, Tr, Td, Box } from "@chakra-ui/react";

function handleTime(time) {
  if (time <= 9) {
    return `0${time}`;
  } else {
    return time;
  }
}

const TablePage = ({ pageData }) => {
  function formatDate(number) {
    switch (number) {
      case 0:
        return "日曜日";
      case 1:
        return "月曜日";
      case 2:
        return "火曜日";
      case 3:
        return "水曜日";
      case 4:
        return "木曜日";
      case 5:
        return "金曜日";
      case 6:
        return "土曜日";
    }
  }

  return (
    <Tbody>
      {pageData?.map((item, i) => {
        if (item !== 0) {
          return (
            <Tr key={item}>
              <Td>{formatDate(new Date(item).getDay())}</Td>
              <Td>
                {new Date(item).getMonth() + 1}月{new Date(item).getDate()}日
              </Td>
              <Td>
                {new Date(item).getHours()}:
                {handleTime(new Date(item).getMinutes())}
              </Td>
            </Tr>
          );
        } else {
          return (
            <Tr key={i}>
              <Td>
                <Box h={15} />
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          );
        }
      })}
    </Tbody>
  );
};

export default TablePage;
