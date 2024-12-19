import * as cookie from "cookie";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    console.log("Handler çalıştı.");
    console.log("token:", process.env.ADMIN_TOKEN);

    const { username, password } = req.body;
    if (
      username == process.env.ADMIN_USERNAME &&
      password == process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.ADMIN_TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "unSuccess" });
    }
  }

  if (method === "PUT") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.ADMIN_TOKEN, {
        maxAge: -1,
        path: "/",
      })
    );
    res.status(200).json({ message: "Success" });
  }
};

export default handler;
