import { useRouter } from "next/router";
import { Heading, Text } from "@chakra-ui/react";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div>
      <Heading size="2xl">
        <h1>404</h1>
      </Heading>
      <Text>
        <h2 size="lg">
          申し訳ございません。このページが存在してないようです。
        </h2>
      </Text>
      <Text
        as="u"
        size="lg"
        color="blue"
        _hover={{ color: "blue.300", cursor: "pointer" }}
      >
        <a onClick={() => router.back()}>前のページに戻る</a>
      </Text>
    </div>
  );
};

export default PageNotFound;
