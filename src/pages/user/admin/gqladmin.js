import React from "react";
import generator from "generate-password";

import jwt from "jsonwebtoken";

import { Grid, GridItem, Box } from "@chakra-ui/react";

import { useState, useEffect, useContext } from "react";

import { requireAuthentication } from "../../../components/HOC/ProtectPath";

import AcctPanel from "../../../components/admin/AcctPanel";
import SchoolPanel from "../../../components/admin/SchoolPanel";
import UserPanel from "../../../components/admin/UserPanel";
import Navbar from "../../../components/navigation/Navbar";

import { UserFormProvider } from "../../../context/UserFormContext";

import AdminContext from "../../../context/AdminContext";
import UserFormContext from "../../../context/UserPanelContext";
import { set } from "lodash";

const awsapi = (props) => {
  const { accountIsLoaded, userListIsLoaded, setUserListIsLoaded } =
    useContext(AdminContext);
  const { reloadUserPanel, setReloadUserPanel } = useContext(UserFormContext);

  //Rendering state variables
  const [render, setRender] = useState(true);

  //Create user state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Create school state variables
  const [school, setSchool] = useState("");
  const [schoolNo, setSchoolNo] = useState("");

  //Create account state variables
  const [selectedSchoolAlert, setSelectedSchoolAlert] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("Nothing selected");
  const [userCount, setUserCount] = useState(0);
  const [accountNo, setAccountNo] = useState("");
  const [accountPerms, setAccountPerms] = useState("");

  const [testUsername, setTestUsername] = useState([]);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const result = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          username: username,
          password: password,
        },
      })
    );
  };

  const handleCreateSchool = async (e) => {
    e.preventDefault();

    const result = await API.graphql(
      graphqlOperation(createSchool, {
        input: {
          name: school,
          number: schoolNo,
        },
      })
    );
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!selectedSchoolId) {
      setSelectedSchoolAlert("Select a school");
    } else {
      const account = await API.graphql(
        graphqlOperation(createAccount, {
          input: {
            number: accountNo,
            permissions: accountPerms,
            usercount: userCount,
            schoolAccountsId: selectedSchoolId,
          },
        })
      );
      generateNewUsers(
        account.data.createAccount.school.name,
        account,
        userCount
      );
    }
  };

  const userNumberParser = (number) => {
    const returnString = "";

    if (number < 10) {
      returnString = "000" + number.toString();
    } else if (number > 10 && number < 100) {
      returnString = "00" + number.toString();
    } else if (number > 100 && number < 1000) {
      returnString = "0" + number.toString();
    } else {
      returnString = number.toString;
    }

    return returnString;
  };

  const generateNewUsers = async (school, account, userNo) => {
    for (let i = 0; i < userNo; i++) {
      const number = userNumberParser(i);
      const username = school + number;
      const password = generator.generate({
        length: 7,
        numbers: true,
      });

      console.log("Number: " + number);

      const user = await API.graphql(
        graphqlOperation(createUser, {
          input: {
            accountUsersId: account.data.createAccount.id,
            username,
            password,
            number,
          },
        })
      );
    }
  };

  return (
    <>
      <Navbar />
      <Box minH="100vh" minW="100vw" bg="blue.300" p={"3%"}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          // templateRows="repeat(2, 1fr)"
          gap={5}
        >
          <GridItem colSpan={1}>
            <SchoolPanel />
          </GridItem>
          <GridItem colSpan={1}>
            {accountIsLoaded ? <AcctPanel /> : ""}
          </GridItem>
          <GridItem colSpan={2} pt={10}>
            {userListIsLoaded ? (
              <UserFormProvider>
                <UserPanel />
              </UserFormProvider>
            ) : (
              ""
            )}
          </GridItem>
        </Grid>
      </Box>
    </>
    // <Container>
    //   <Box>
    //     <Heading>Create School</Heading>
    //     <form>
    //       <Input
    //         type="text"
    //         value={school}
    //         onChange={(e) => {
    //           setSchool(e.target.value);
    //         }}
    //       />
    //       <Input
    //         type="text"
    //         value={schoolNo}
    //         onChange={(e) => {
    //           setSchoolNo(e.target.value);
    //         }}
    //       />
    //       <Button type="submit" onClick={handleCreateSchool}>
    //         Create
    //       </Button>
    //     </form>
    //   </Box>

    //   <Box>
    //     <Heading>Create Account</Heading>
    //     <Select
    //       placeholder="Select School"
    //       onChange={(e) => {
    //         setSelectedSchoolId(e.target.value);
    //       }}
    //     >
    //       {props.schools.data.listSchools.items.map((school) => {
    //         return (
    //           <option value={school.id} key={school.id}>
    //             {school.name}
    //           </option>
    //         );
    //       })}
    //     </Select>
    //     <Text>{selectedSchoolAlert}</Text>
    //     <form>
    //       <FormLabel>Account Number</FormLabel>
    //       <Input
    //         type="text"
    //         value={accountNo}
    //         onChange={(e) => {
    //           setAccountNo(e.target.value);
    //         }}
    //       />
    //       <FormLabel>Account Permissions</FormLabel>
    //       <Input
    //         type="text"
    //         value={accountPerms}
    //         onChange={(e) => {
    //           setAccountPerms(e.target.value);
    //         }}
    //       />
    //       <FormLabel>User Amount</FormLabel>
    //       <Input
    //         type="text"
    //         value={userCount}
    //         onChange={(e) => {
    //           setUserCount(e.target.value);
    //         }}
    //       />
    //       <Button type="submit" onClick={handleCreateAccount}>
    //         Create
    //       </Button>
    //     </form>
    //   </Box>

    //   <Box>
    //     <Heading>Create User</Heading>
    //     <form>
    //       <Input
    //         type="text"
    //         value={username}
    //         onChange={(e) => {
    //           setUsername(e.target.value);
    //         }}
    //       />
    //       <Input
    //         type="text"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //       />
    //       <Button type="submit" onClick={handleCreateUser}>
    //         Create
    //       </Button>
    //     </form>
    //   </Box>

    //   <Heading>{JSON.stringify(testUsername)}</Heading>

    //   <Heading>Data:</Heading>
    //   <pre>
    //     {props.data
    //       ? JSON.stringify(props.data, null, 2)
    //       : JSON.stringify(props, null, 2)}
    //   </pre>
    // </Container>
  );
};

// export async function getServerSideProps(context) {
//   const schools = await API.graphql(graphqlOperation(listSchools));
//   return {
//     props: {
//       schools
//     },
//   };
// }

export const getServerSideProps = requireAuthentication(async (context) => {
  const user = context.req.cookies.AELJWT;
  let perm = [];
  let username = "";
  if (user) {
    const decUser = jwt.decode(user);
    if (decUser.courses.length > 0) {
      perm = decUser.courses;
      username = decUser.username;
    } else {
      perm = "No available courses";
    }
  }

  return {
    props: {
      username: username,
      perm: perm,
    },
  };
});

export default awsapi;
