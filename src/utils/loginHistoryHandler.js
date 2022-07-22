import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";

export async function handleLoginHistory(userId) {
  const loginTime = Date.now();

  const userData = await API.graphql(graphqlOperation(getUser, { id: userId }));
  let loginHistory = userData.data.getUser.loginHistory;

  if (loginHistory) {
    if (loginTime - parseInt(loginHistory[loginHistory.length - 1]) > 300000) {
      loginHistory.push(loginTime);

      const updated = await API.graphql(
        graphqlOperation(updateUser, {
          input: { id: userId, loginHistory: loginHistory },
        })
      );

      return loginHistory;
    } else {
      return loginHistory;
    }
  } else {
    loginHistory = [loginTime];
    const updated = await API.graphql(
      graphqlOperation(updateUser, {
        input: { id: userId, loginHistory: loginHistory },
      })
    );

    return loginHistory;
  }
}
