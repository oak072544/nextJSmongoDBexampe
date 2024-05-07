import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("project");
    const { id } = req.query;

    const post = await db.collection("service").deleteOne(
      {
        _id: new ObjectId(id)
      }
    );
    res.json(post);
  } catch (error) {
    console.error(error);
    throw new Error(error).message;
  }
};
