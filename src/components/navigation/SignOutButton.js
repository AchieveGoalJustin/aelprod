import React from "react";
import { useContext } from "react";

import cookie from "js-cookie";

import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";

import SessionContext from "../../context/SessionContext";

const SignOutButton = () => {
  const { setIsLogged, setIsAdmin } = useContext(SessionContext);

  const reinitContext = () => {
    setIsAdmin(false);
  };

  const router = useRouter();

  const handleLogout = async () => {
    reinitContext();
    setIsLogged(false);
    cookie.remove("AELJWT");
    cookie.set(
      "message",
      "ログアウトしました。今日もお疲れ様でした。引き続き頑張りましょう！"
    );
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
