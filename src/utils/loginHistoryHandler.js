import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";

export async function handleLoginHistory(userId) {
  const loginTime = Date.now();

  const userData = await API.graphql(graphqlOperation(getUser, { id: userId }));
  console.log(userData)

  return userData
}
