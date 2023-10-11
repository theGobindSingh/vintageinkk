import { NextApiHandler } from "next";
import { getAllCategories } from "../../apis";

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = await getAllCategories();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
