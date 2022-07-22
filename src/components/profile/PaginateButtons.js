import React, { useState, useEffect } from "react";

import { Flex, Spacer, Box, Button } from "@chakra-ui/react";

const PaginateButtons = ({ loginHistory, currentPage, setCurrentPage }) => {
  const [isFirstPage, setIsFirstpage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  function handlePageDown() {
    console.log("page down");
    if (currentPage !== 0) {
      setCurrentPage(currentPage--);
    }
  }

  function handlePageUp() {
    console.log("page up");
    if (currentPage !== loginHistory.length) {
      setCurrentPage(currentPage++);
    }
  }

  useEffect(() => {
    console.log(loginHistory.length);
    console.log(currentPage);
    if (currentPage === 0) {
      setIsFirstpage(true);
      setIsLastPage(false);
    } else if (currentPage === loginHistory.length) {
      setIsLastPage(true);
      setIsFirstpage(true);
    } else {
      setIsFirstpage(false);
      setIsLastPage(false);
    }
  });

  return (
    <Flex my={2}>
      <Spacer />
      {!isFirstPage && (
        <Button size={"sm"} colorScheme={"blue"} onClick={handlePageDown}>
          前へ
        </Button>
      )}
      <Box fontWeight={"bold"} mx={3}>
        {currentPage + 1}/{loginHistory.length}
      </Box>
      {!isLastPage && (
        <Button size={"sm"} colorScheme={"blue"} onClick={handlePageUp}>
          次へ
        </Button>
      )}
      <Spacer />
    </Flex>
  );
};

export default PaginateButtons;
