import React from "react";
import cookie from 'js-cookie'

import { useRouter } from "next/router";
// import { useCookies } from 'react-cookie'

import axios from "axios";

import { Button } from "@chakra-ui/react";

const SignOutButton = () => {

  // const [cookies, setCookie, removeCookie] = useCookies([])

  const router = useRouter();

  const handleLogout = async () => {
    cookie.remove('AELJWT')
    cookie.set('message', 'ログアウトしました。今日もお疲れ様でした。引き続き頑張りましょう！')
    router.replace("/");
  };

  return (
    <Button
      ms={3}
      colorScheme="red"
      variant="outline"
      fontWeight="bold"
      size="md"
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
};

export default SignOutButton;
