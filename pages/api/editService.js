import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("project");
    const { id } = req.query;
    const { name, image, link } = req.body;
    const role = req.body.role;

    const post = await db.collection("service").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          name: name,
          image: image,
          role: role,
          link: link,
        },
      }
    );
    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
