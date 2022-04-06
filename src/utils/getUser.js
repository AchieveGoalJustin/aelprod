import jwt from "jsonwebtoken";

const getUser = (req) => {
  const user = req.cookies.AELJWT;
  if (user) {
    // const user = req.cookies.AELJWT;
    const decUser = jwt.decode(user);
    let perm = [];
    if (decUser.courses.length > 0) {
      perm = decUser.courses;
      return { perm: perm, username: decUser.username };
    } else {
      perm = "No available courses";
      return { perm: perm };
    }
  }
  let perm = "User not available";
  return { perm: perm };
};

export default getUser;
