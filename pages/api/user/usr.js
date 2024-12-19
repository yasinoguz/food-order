import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import { BiMessage } from "react-icons/bi";

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
      console.log("bulundu");
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
