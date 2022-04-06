export default async function (req, res) {
  console.log("User API accessed");
  const { cookies } = req;

  const jwt = cookies.AELJWT;

  if (!jwt) {
    res.json({ message: "Invalid token!" });
  }

  console.log(jwt);

  res.json({ data: "Top secret data" });
}
