import { serialize } from "cookie";

export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.AELJWT;

  if (!jwt) {
    return res.json({ message: "Already logged out." });
  } else {
    const serialized = serialize("AELJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("Log out successful");
  }
}
