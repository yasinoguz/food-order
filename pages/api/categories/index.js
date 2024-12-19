import dbConnect from "../../../util/dbConnect";
import category from "../../../models/category";
import { BiMessage } from "react-icons/bi";

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      const newcategory = await category.create(req.body);
      res.status(200).json(newcategory);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
